namespace ZadatakSaMapom.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using ZadatakSaMapom.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<ZadatakSaMapom.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ZadatakSaMapom.Models.ApplicationDbContext context)
        {
            context.Cars.AddOrUpdate(m => m.Id,
                new Car() { Id = 1, Coment = "Coment 1", X = 45.24975464648731, Y = 19.818305969238285, Dors = 4 },
                new Car() { Id = 2, Coment = "Coment 2", X = 44.75648588056624, Y = 20.45242309570313, Dors = 5 },
                new Car() { Id = 3, Coment = "Coment 3", X = 43.31718491566705, Y = 21.87583923339844, Dors = 4 }
                );
            context.Trucks.AddOrUpdate(m => m.Id,
              new Truck() { Id = 1, Coment = "Coment 1 Truck", X = 44.75648588056624, Y = 20.45242309570313, Capacity = 2000 },
              new Truck() { Id = 2, Coment = "Coment 2 Truck", X = 44.246182778311415, Y = 19.86808776855469, Capacity = 1500 },
              new Truck() { Id = 3, Coment = "Coment 3 Truck", X = 46.027481852486645, Y = 19.703979492187504, Capacity = 1000 }
              );
            context.Motorcycles.AddOrUpdate(m => m.Id,
             new Motorcycle() { Id = 1, Coment = "Coment 1 Motorcycle", X = 43.31718491566705, Y = 21.87583923339844, Cubic = 1500 },
             new Motorcycle() { Id = 2, Coment = "Coment 2 Motorcycle", X = 45.24975464648731, Y = 19.818305969238285, Cubic = 1000 },
             new Motorcycle() { Id = 3, Coment = "Coment 3 Motorcycle", X = 46.027481852486645, Y = 19.703979492187504, Cubic = 700 }
             );
        }
    }
}
