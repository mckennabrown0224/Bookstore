using BookstoreProject.API.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace BookstoreProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private readonly BookstoreDbContext _bookstoreContext;

        public BookstoreController(BookstoreDbContext temp) => _bookstoreContext = temp;

        [HttpGet("GetAllBooks")]
        public IActionResult GetAllBooks(int pageSize = 5, int pageNum = 1, bool isSorted = false)
        {
            var query = _bookstoreContext.Books.AsQueryable();

            // Apply sorting if isSorted is true
            if (isSorted)
            {
                query = query.OrderBy(b => b.Title);
            }

            var books = query.Skip((pageNum - 1) * pageSize).Take(pageSize).ToList();
            var numBooks = _bookstoreContext.Books.Count();

            var result = new
            {
                Books = books,
                numBooks = numBooks
            };

            return Ok(result);
        }
    }
}





