using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ZadatakSaMapom.Models
{
    public class Truck : Vehicle
    {
        public int Id { get; set; }
        [Required]

        public int Capacity { get; set; }
    }
}