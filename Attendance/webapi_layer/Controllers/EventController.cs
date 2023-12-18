using Domain_Library.Models;
using Domain_Library.ViewModels;
using Infra_Library.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace webapi_layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly MainDbContext _context;

        public EventController(MainDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            var events = await _context.Events
                .Include(e => e.User) 
                .ToListAsync();

           
            var eventsWithUsername = events.Select(e => new
            {
                Id = e.Id,
                EventName = e.EventName,
                EventType = e.eventtype,
                DateTime = e.DateTime,
                EventDateTime = e.EventDateTime,
             
                UserId = e.UserId,
                Username = e.User.Username ,
                Mentor = e.Mentor
            });

            return Ok(eventsWithUsername);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            var @event = await _context.Events.FindAsync(id);

            if (@event == null)
            {
                return NotFound();
            }

            return @event;
        }

        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(EventInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var @event = new Event
            {
                EventName = model.EventName,
                eventtype = model.EventType,
                DateTime = DateTime.Now,
                EventDateTime = model.EventDateTime,
              
                UserId = user.Id,
                Mentor = model.Mentor
            };

            _context.Events.Add(@event);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEvent", new { id = @event.Id }, @event);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateEvent([FromBody] Event updatedEvent)
        {
            if (updatedEvent == null)
            {
                return BadRequest("Invalid data");
            }

            var existingEvent = await _context.Events
                .Include(e => e.User)
                .FirstOrDefaultAsync(e => e.Id == updatedEvent.Id);

            if (existingEvent == null)
            {
                return NotFound("Event not found");
            }

           
            existingEvent.EventName = updatedEvent.EventName;
            existingEvent.eventtype = updatedEvent.eventtype;
            existingEvent.DateTime = updatedEvent.DateTime;
            existingEvent.EventDateTime = updatedEvent.EventDateTime;
            existingEvent.Mentor = updatedEvent.Mentor;

           
            if (existingEvent.User != null && updatedEvent.User != null)
            {
                existingEvent.User.Username = updatedEvent.User.Username;
               
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(updatedEvent.Id))
                {
                    return NotFound("Event not found");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }



        [HttpDelete("{id}")]
        public async Task<ActionResult<Event>> DeleteEvent(int id)
        {
            var @event = await _context.Events.FindAsync(id);
            if (@event == null)
            {
                return NotFound();
            }

            _context.Events.Remove(@event);
            await _context.SaveChangesAsync();

            return @event;
        }
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Event>>> GetUserEvents(int userId)
        {
            var user = await _context.Users.Include(u => u.Events).FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(user.Events);
        }

        private bool EventExists(int id)
        {
            return _context.Events.Any(e => e.Id == id);
        }

        public class EventInputModel
        {
            public string EventName { get; set; }
            public string EventType { get; set; }
            public DateTime EventDateTime { get; set; }
            public string Username { get; set; }
            public string Mentor { get; set; }
           
        }
      

    }

  
}

