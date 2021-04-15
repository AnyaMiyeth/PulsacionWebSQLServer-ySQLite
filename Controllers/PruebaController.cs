using System.IO.Pipes;
using System.Reflection.Metadata.Ecma335;
using Entidad;
using Logica;
using Microsoft.AspNetCore.Mvc;
using pulsacionesdotnet.Models;
using Microsoft.Extensions.Configuration;
namespace pulsacionesdotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PruebaController : ControllerBase
    {
        private PersonaService personaService;
        public IConfiguration Configuration { get; }
        public PruebaController(IConfiguration configuration)
        {
            Configuration = configuration;
            string cadena = Configuration["ConnectionStrings:DefaultConnection"];
            personaService = new PersonaService(cadena);
        }

        [HttpPost]
        public ActionResult<PersonaViewModel> PostPersona(PersonaInputModel personaInput)
        {
            var persona = MapearPersona(personaInput);
            var response = personaService.Guardar(persona);
            if (response.Error)
            {
                return BadRequest(response.Mensaje);
            }
            return Ok(response.Persona);
        }

        private Persona MapearPersona(PersonaInputModel personaInput)
        {
            var persona = new Persona
            {
                Identificacion = personaInput.Identificacion,
                Nombre = personaInput.Nombre,
                Edad = personaInput.Edad,
                Sexo = personaInput.Sexo
            };
            return persona;
        }

    }
}