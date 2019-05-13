using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ZadatakSaMapom.Models
{
    public class Car : Vehicle
    {
        public int Id { get; set; }
        [Required]

        public int Dors { get; set; }
    }
}