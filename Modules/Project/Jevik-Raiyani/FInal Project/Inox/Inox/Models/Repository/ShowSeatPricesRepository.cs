using Inox.Models.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inox.Models.Repository
{
    public class ShowSeatPricesRepository:GenericRepository<ShowSeatPrice>, IShowSeatPrices
    {
        public ShowSeatPricesRepository(inoxContext context) : base(context)
        {

        }
    }
}

