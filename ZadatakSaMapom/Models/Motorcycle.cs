using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ZadatakSaMapom.Models
{
    public class Motorcycle : Vehicle
    {
        public int Id { get; set; }
        [Required]

        public int Cubic { get; set; }
    }
}