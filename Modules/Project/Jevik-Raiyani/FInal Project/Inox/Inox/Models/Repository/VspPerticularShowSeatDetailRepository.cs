using Inox.Models.IRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inox.Models.Repository
{
    public class VspPerticularShowSeatDetailRepository :GenericRepository<VspPerticularShowSeatDetail>, IVspPerticularShowSeatDetail
    {
        public VspPerticularShowSeatDetailRepository(inoxContext context) : base(context)
        {
           
        }
        public List<VspPerticularShowSeatDetail> GetSpPerticularShowSeatDetails(int id)
        {

            return  this.context.VspPerticularShowSeatDetails.FromSqlRaw<VspPerticularShowSeatDetail>($"EXEC PerticularShowSeatDetail @showTimeID = {id}").ToList();

        }
    }
}

