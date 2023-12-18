using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain_Library.Models;
using Infra_Library.Context;
using Domain_Library;

[Route("api/[controller]")]
[ApiController]
public class ReportController : ControllerBase
{
    private readonly MainDbContext _context;

    public ReportController(MainDbContext context)
    {
        _context = context;
    }

    [HttpGet("GetAllReports")]
    public async Task<ActionResult<IEnumerable<Report>>> GetAllReports()
    {
        var reports = await _context.Reports
            .Include(r => r.FinishBreak)
            .Include(r => r.ClockoutTime)
            .Include(r => r.AttendBreak)
            .ToListAsync();

        if (reports == null || !reports.Any())
        {
            return NoContent();
        }

        return reports;
    }

    public class ReportDto
    {
        public int UserId { get; set; }
        public int AttendanceId { get; set; }

        public int StartBreakId { get; set; }
        public int FinishBreakID { get; set; }
        public int CheckoutTimeId { get; set; }
    }


    [HttpGet("CalculateTotalHours/{userId}")]
    public async Task<ActionResult<TimeSpan>> CalculateTotalHours(int userId)
    {
       
        DateTime today = DateTime.Today;

       
        var userClockInTimes = await _context.Attendances
            .Where(a => a.UserId == userId && a.CheckInTime.Date == today)
            .Select(a => a.CheckInTime)
            .ToListAsync();

      
        var userClockOutTimes = await _context.ClockoutTimes
            .Where(c => c.UserId == userId && c.ClockOutTime.Date == today)
            .Select(c => c.ClockOutTime)
            .ToListAsync();

        if (!userClockInTimes.Any())
        {
            return NotFound($"Attendances for user with id {userId} on {today.ToShortDateString()} not found.");
        }

        TimeSpan totalTime = TimeSpan.Zero;

        for (int i = 0; i < userClockInTimes.Count; i++)
        {
            var clockinTime = userClockInTimes[i];
            var clockoutTime = i < userClockOutTimes.Count ? userClockOutTimes[i] : default;

            if (clockoutTime != default)
            {
                var timeDiff = clockoutTime - clockinTime;
                totalTime += timeDiff;
            }
            else
            {
                Console.WriteLine($"Clock-out time not found for user ID: {userId}, Attendance index: {i}");
            }
        }

        TimeSpan absoluteTime = totalTime.Duration();

        return Ok(absoluteTime);
    }

    [HttpGet("CalculateProductiveHours/{userId}")]
    public async Task<ActionResult<TimeSpan>> CalculateProductiveHours(int userId)
    {
       
        DateTime today = DateTime.Today;

       
        var userClockInTimes = await _context.Attendances
            .Where(a => a.UserId == userId && a.CheckInTime.Date == today)
            .Select(a => a.CheckInTime)
            .ToListAsync();

      
        var userClockOutTimes = await _context.ClockoutTimes
            .Where(c => c.UserId == userId && c.ClockOutTime.Date == today)
            .Select(c => c.ClockOutTime)
            .ToListAsync();

      
        var userStartBreakTimes = await _context.StartBreaks
            .Where(s => s.UserId == userId && s.startbreak.Date == today)
            .Select(s => s.startbreak)
            .ToListAsync();

      
        var userFinishBreakTimes = await _context.FinishBreaks
            .Where(f => f.UserId == userId && f.finishBreak.Date == today)
            .Select(f => f.finishBreak)
            .ToListAsync();

        if (!userClockInTimes.Any() || !userClockOutTimes.Any())
        {
            return NotFound($"Clock-in or Clock-out times for user with id {userId} on {today.ToShortDateString()} not found.");
        }

        TimeSpan totalTime = TimeSpan.Zero;

        for (int i = 0; i < userClockInTimes.Count; i++)
        {
            var clockInTime = userClockInTimes[i];
            var clockOutTime = userClockOutTimes.ElementAtOrDefault(i);

            if (clockOutTime != default)
            {
                totalTime += clockOutTime - clockInTime;
            }

            var startBreakTime = userStartBreakTimes.ElementAtOrDefault(i);
            var finishBreakTime = userFinishBreakTimes.ElementAtOrDefault(i);

            if (startBreakTime != default && finishBreakTime != default)
            {
                totalTime -= finishBreakTime - startBreakTime;
            }
        }

        TimeSpan absoluteTime = totalTime.Duration();

        return Ok(absoluteTime);
    }

    [Route("DataById")]
    [HttpGet]
    public async Task<ActionResult<int>> DataById(int userId)
    {
        if (userId <= 0)
            return BadRequest("Invalid User ID, Please provide a valid ID...!");

        var user = await _context.Users
            .Where(u => u.Id == userId)
            .FirstOrDefaultAsync();

        if (user == null)
            return BadRequest("User with the specified ID does not exist...!");

        var allClockOutTimes = await _context.ClockoutTimes
            .Where(c => c.UserId == userId)
            .Select(c => c.ClockOutTime)
            .ToListAsync();

        var allClockInTimes = await _context.Attendances
            .Where(c => c.UserId == userId)
            .Select(c => c.CheckInTime)
            .ToListAsync();

        var allStartbreakTime = await _context.StartBreaks
            .Where(c => c.UserId == userId)
            .Select(c => c.startbreak)
            .ToListAsync();

        var allFinishbreakTime = await _context.FinishBreaks
            .Where(c => c.UserId == userId)
            .Select(c => c.finishBreak)
            .ToListAsync();

        var clockInTimes = allClockInTimes
            .Where(c => c != null)
            .ToList();

        var clockOutTimes = allClockOutTimes
            .ToList();

        var result = new List<object>();

        foreach (var date in clockInTimes.Select(checkInTime => checkInTime.Date).Distinct())
        {
            var clockInTimesForDate = clockInTimes
                .Where(c => c.Date == date)
                .ToList();

            var startBreakTimes = allStartbreakTime
                .Where(s => s.Date == date)
                .Select(s => s)
                .ToList();

            var finishBreakTimes = allFinishbreakTime
                .Where(f => f.Date == date)
                .Select(f => f)
                .ToList();

            var totalProductiveHoursResult = await CalculateProductiveHoursForDate(userId, date);
            if (totalProductiveHoursResult.Result is OkObjectResult okResult)
            {
                var totalProductiveHours = (TimeSpan)okResult.Value;

                var totalHoursResult = await CalculateTotalHoursForDate(userId, date);
                if (totalHoursResult.Result is OkObjectResult totalHoursOkResult)
                {
                    var totalHours = (TimeSpan)totalHoursOkResult.Value;

                    var resultObject = new
                    {
                        UserId = user.Id,
                        UserName = user.Username,
                        Email = user.Email,
                        Date = date,
                        ClockInTimes = clockInTimesForDate,
                        ClockOutTimes = clockOutTimes,
                        StartBreakTimes = startBreakTimes,
                        FinishBreakTimes = finishBreakTimes,
                        TotalProductiveHours = totalProductiveHours,
                        TotalHours = totalHours,
                    };

                    result.Add(resultObject);
                }
            }
        }

        return Ok(result);
    }

    private async Task<ActionResult<TimeSpan>> CalculateTotalHoursForDate(int userId, DateTime date)
    {
        var userClockInTimes = await _context.Attendances
            .Where(a => a.UserId == userId && a.CheckInTime.Date == date)
            .Select(a => a.CheckInTime)
            .ToListAsync();

        var userClockOutTimes = await _context.ClockoutTimes
            .Where(c => c.UserId == userId && c.ClockOutTime.Date == date)
            .Select(c => c.ClockOutTime)
            .ToListAsync();

        if (!userClockInTimes.Any())
        {
            return NotFound($"Attendances for user with id {userId} on {date.ToShortDateString()} not found.");
        }

        TimeSpan totalTime = TimeSpan.Zero;

        for (int i = 0; i < userClockInTimes.Count; i++)
        {
            var clockinTime = userClockInTimes[i];
            var clockoutTime = i < userClockOutTimes.Count ? userClockOutTimes[i] : default;

            if (clockoutTime != default)
            {
                var timeDiff = clockoutTime - clockinTime;
                totalTime += timeDiff;
            }
            else
            {
                Console.WriteLine($"Clock-out time not found for user ID: {userId}, Attendance index: {i}");
            }
        }

        TimeSpan absoluteTime = totalTime.Duration();

        return Ok(absoluteTime);
    }

    private async Task<ActionResult<TimeSpan>> CalculateProductiveHoursForDate(int userId, DateTime date)
    {
        var userClockInTimes = await _context.Attendances
            .Where(a => a.UserId == userId && a.CheckInTime.Date == date)
            .Select(a => a.CheckInTime)
            .ToListAsync();

        var userClockOutTimes = await _context.ClockoutTimes
            .Where(c => c.UserId == userId && c.ClockOutTime.Date == date)
            .Select(c => c.ClockOutTime)
            .ToListAsync();

        var userStartBreakTimes = await _context.StartBreaks
            .Where(s => s.UserId == userId && s.startbreak.Date == date)
            .Select(s => s.startbreak)
            .ToListAsync();

        var userFinishBreakTimes = await _context.FinishBreaks
            .Where(f => f.UserId == userId && f.finishBreak.Date == date)
            .Select(f => f.finishBreak)
            .ToListAsync();

        if (!userClockInTimes.Any() || !userClockOutTimes.Any())
        {
            return NotFound($"Clock-in or Clock-out times for user with id {userId} on {date.ToShortDateString()} not found.");
        }

        TimeSpan totalTime = TimeSpan.Zero;

        for (int i = 0; i < userClockInTimes.Count; i++)
        {
            var clockInTime = userClockInTimes[i];
            var clockOutTime = userClockOutTimes.ElementAtOrDefault(i);

            if (clockOutTime != default)
            {
                totalTime += clockOutTime - clockInTime;
            }

            var startBreakTime = userStartBreakTimes.ElementAtOrDefault(i);
            var finishBreakTime = userFinishBreakTimes.ElementAtOrDefault(i);

            if (startBreakTime != default && finishBreakTime != default)
            {
                totalTime -= finishBreakTime - startBreakTime;
            }
        }

        TimeSpan absoluteTime = totalTime.Duration();

        return Ok(absoluteTime);
    }



    [Route("DataByUsername")]
    [HttpGet]
    public async Task<ActionResult<int>> DataByUsername(string username)
    {
        if (string.IsNullOrEmpty(username))
            return BadRequest("Invalid username, Please provide a valid username...!");

        var user = await _context.Users
            .Where(u => u.Username == username)
            .FirstOrDefaultAsync();

        if (user == null)
            return BadRequest("User with the specified username does not exist...!");

        var allClockOutTimes = await _context.ClockoutTimes
            .Where(c => c.UserId == user.Id)
            .Select(c => c.ClockOutTime)
            .ToListAsync();

        var allClockInTimes = await _context.Attendances
            .Where(c => c.UserId == user.Id)
            .Select(c => c.CheckInTime)
            .ToListAsync();

        var allStartbreakTime = await _context.StartBreaks
            .Where(c => c.UserId == user.Id)
            .Select(c => c.startbreak)
            .ToListAsync();

        var allFinishbreakTime = await _context.FinishBreaks
            .Where(c => c.UserId == user.Id)
            .Select(c => c.finishBreak)
            .ToListAsync();

        var clockInTimes = allClockInTimes
            .Where(c => c != null)
            .ToList();

        var clockOutTimes = allClockOutTimes
            .ToList();

        var groupedByDate = clockInTimes
            .GroupBy(checkInTime => checkInTime.Date);

        var result = new List<object>();

        foreach (var group in groupedByDate)
        {
            var date = group.Key;

            var clockInTimesForDate = group.ToList();
            var startBreakTimes = allStartbreakTime
                .Where(s => s.Date == date)
                .Select(s => s)
                .ToList();

            var finishBreakTimes = allFinishbreakTime
                .Where(f => f.Date == date)
                .Select(f => f)
                .ToList();

            var totalProductiveHoursResult = await CalculateProductiveHours(user.Id);
            if (totalProductiveHoursResult.Result is OkObjectResult okResult)
            {
                var totalProductiveHours = (TimeSpan)okResult.Value;

                var totalHoursResult = await CalculateTotalHours(user.Id);
                if (totalHoursResult.Result is OkObjectResult totalHoursOkResult)
                {
                    var totalHours = (TimeSpan)totalHoursOkResult.Value;

                    var resultObject = new
                    {
                        UserId = user.Id,
                        UserName = user.Username,
                        Email = user.Email,
                        Date = date,
                        ClockInTimes = clockInTimesForDate,
                        ClockOutTimes = clockOutTimes,
                        StartBreakTimes = startBreakTimes,
                        FinishBreakTimes = finishBreakTimes,
                        TotalProductiveHours = totalProductiveHours,
                        TotalHours = totalHours,
                    };

                    result.Add(resultObject);
                }
            }
        }

        return Ok(result);
    }

   /* [Route("DataByUsername")]
    [HttpGet]
    public async Task<ActionResult<int>> DataByUsername(string username)
    {
        if (string.IsNullOrEmpty(username))
            return BadRequest("Invalid username, Please provide a valid username...!");

        var user = await _context.Users
            .Where(u => u.Username == username)
            .FirstOrDefaultAsync();

        if (user == null)
            return BadRequest("User with the specified username does not exist...!");

        var allClockInTimes = await _context.Attendances
            .Where(c => c.UserId == user.Id)
            .Select(c => c.CheckInTime)
            .ToListAsync();

        var allStartbreakTime = await _context.StartBreaks
            .Where(c => c.UserId == user.Id)
            .Select(c => c.startbreak)
            .ToListAsync();

        var allFinishbreakTime = await _context.FinishBreaks
            .Where(c => c.UserId == user.Id)
            .Select(c => c.finishBreak)
            .ToListAsync();

        var clockInTimes = allClockInTimes
            .Where(c => c != null)
            .ToList();

        var groupedByDate = clockInTimes
            .GroupBy(checkInTime => checkInTime.Date);

        var result = new List<object>();

        foreach (var group in groupedByDate)
        {
            var date = group.Key;

            var clockInTimesForDate = group.ToList();
            var startBreakTimes = allStartbreakTime
                .Where(s => s.Date == date)
                .Select(s => s)
                .ToList();

            var finishBreakTimes = allFinishbreakTime
                .Where(f => f.Date == date)
                .Select(f => f)
                .ToList();

            var totalProductiveHoursResult = await CalculateProductiveHoursForDate(user.Id, date);
            if (totalProductiveHoursResult.Result is OkObjectResult okResult)
            {
                var totalProductiveHours = (TimeSpan)okResult.Value;

                var totalHoursResult = await CalculateTotalHoursForDate(user.Id, date);
                if (totalHoursResult.Result is OkObjectResult totalHoursOkResult)
                {
                    var totalHours = (TimeSpan)totalHoursOkResult.Value;

                    var resultObject = new
                    {
                        UserId = user.Id,
                        UserName = user.Username,
                        Email = user.Email,
                        Date = date,
                        ClockInTimes = clockInTimesForDate,
                        StartBreakTimes = startBreakTimes,
                        FinishBreakTimes = finishBreakTimes,
                        TotalProductiveHours = totalProductiveHours,
                        TotalHours = totalHours,
                    };

                    result.Add(resultObject);
                }
            }
        }

        return Ok(result);
    }*/


}



