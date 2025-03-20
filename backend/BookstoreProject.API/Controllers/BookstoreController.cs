using BookstoreProject.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
       private BookstoreDbContext _bookstoreContext;
       
       public BookstoreController(BookstoreDbContext temp) => _bookstoreContext = temp;
       
       [HttpGet("GetAllBooks")]
       public IActionResult GetAllBooks(int pageSize = 10, int pageNum = 1)
       {
           var tempObject = new
           {
               Books = _bookstoreContext.Books.Skip((pageNum-1) * pageSize).Take(pageSize).ToList(),
               numBooks = _bookstoreContext.Books.Count()
           };
            
           return Ok(tempObject);
       }
    }
}


