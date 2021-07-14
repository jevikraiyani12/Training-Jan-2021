using Inox.Models;
using Inox.Models.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inox.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowSeatPricesController : ControllerBase
    {
        IShowSeatPrices _showSeatPrices;

        public ShowSeatPricesController(IShowSeatPrices showSeatPrices)
        {
            this._showSeatPrices = showSeatPrices;
        }


        [HttpGet]
        public IEnumerable<ShowSeatPrice> GetShowSeatPrices()
        {
            return _showSeatPrices.GetAll();
        }
        // [Authorize(Roles = UserRoles.CinemaAdmin)]
        [HttpGet("{id}")]
        public ActionResult<ShowSeatPrice> GetShowSeatPrices(int id)
        {
            var showSeatPrice = _showSeatPrices.GetById(id);

            if (showSeatPrice == null)
            {
                return NotFound();
            }

            return showSeatPrice;
        }

        [HttpPut("{id}")]
        public ActionResult<ShowSeatPrice> PutShowSeatPrices(int id, ShowSeatPrice showSeatPrice)
        {

            try
            {
                _showSeatPrices.Update(showSeatPrice);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return GetShowSeatPrices(id);

        }

        [HttpPost]
        public ActionResult<ShowSeatPrice> PostShowSeatPrices(ShowSeatPrice showSeatPrice)
        {

            try
            {
                _showSeatPrices.Create(showSeatPrice);
            }
            catch (DbUpdateException)
            {
                if (_showSeatPrices.Any(e => e.ShowSeatPriceId == showSeatPrice.ShowSeatPriceId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetShowSeatPrices", new { id = showSeatPrice.ShowSeatPriceId }, showSeatPrice);
        }
       // [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public IActionResult DeleteShowSeatPrices(int id)
        {
            var showSeatPrice = _showSeatPrices.GetById(id);
            if (showSeatPrice == null)
            {
                return NotFound();
            }

            _showSeatPrices.Delete(showSeatPrice);

            return NoContent();
        }


    }
}
