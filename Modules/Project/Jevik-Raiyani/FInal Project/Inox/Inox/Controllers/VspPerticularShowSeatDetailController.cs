using Inox.Models;
using Inox.Models.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Inox.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VspPerticularShowSeatDetailController : ControllerBase
    {
        IVspPerticularShowSeatDetail _vspPerticularShowSeatDetail;

        public VspPerticularShowSeatDetailController(IVspPerticularShowSeatDetail vspPerticularShowSeatDetail)
        {
            this._vspPerticularShowSeatDetail = vspPerticularShowSeatDetail;
        }


        [HttpGet("{id}")]
        public List<VspPerticularShowSeatDetail> GetSpPerticularShowSeatDetails(int id)
        {
            var vspPerticularShowSeatDetails  =  _vspPerticularShowSeatDetail.GetSpPerticularShowSeatDetails(id);

            if (vspPerticularShowSeatDetails == null)
            {
                return null;
            }

            return vspPerticularShowSeatDetails;
        }


    }
}