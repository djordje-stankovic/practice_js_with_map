using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ZadatakSaMapom.Models;

namespace ZadatakSaMapom.Controllers
{
    public class MyController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();



        public Dictionary<string, Object> getAll()
        {
            IEnumerable<Car> cars = db.Cars;
            IEnumerable<Motorcycle> morotcycles = db.Motorcycles;
            IEnumerable<Truck> truck = db.Trucks;
            Dictionary<string, Object> All = new Dictionary<string,Object>();
            All.Add("Cars", cars);
            All.Add("Motorcycle",morotcycles);
            All.Add("Truck", truck);
            return All;
        }

    }
}
