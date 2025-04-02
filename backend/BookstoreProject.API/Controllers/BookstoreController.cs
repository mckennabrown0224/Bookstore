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
        public IActionResult GetAllBooks(int pageSize = 5, int pageNum = 1, bool isSorted = false, [FromQuery(Name = "bookTypes")] List<string>? bookCategories = null)
        {
            Console.WriteLine($"Received categories: {string.Join(", ", bookCategories ?? new List<string>())}");

            var query = _bookstoreContext.Books.AsQueryable();

            
            // Apply filtering if bookCategories are provided
            if (bookCategories?.Any() == true)
            {
                query = query.Where(b => bookCategories.Contains(b.Category));
            }

            // Apply sorting if isSorted is true
            if (isSorted)
            {
                query = query.OrderBy(b => b.Title);
            }

            var books = query.Skip((pageNum - 1) * pageSize).Take(pageSize).ToList();
            var numBooks = query.Count();

            var result = new
            {
                Books = books,
                numBooks = numBooks
            };

            return Ok(result);
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookTypes = _bookstoreContext.Books.Select(p => p.Category).Distinct().ToList();
            
            return Ok(bookTypes);
        }
        
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookstoreContext.Books.Add(newBook);
            _bookstoreContext.SaveChanges();
            return Ok();
        }
        
        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _bookstoreContext.Books.Find(bookID);
            if (existingBook == null)
            {
                return NotFound(new {message = "Book not found"});
            }
            else
            {
                existingBook.Title = updatedBook.Title;
                existingBook.Author = updatedBook.Author;
                existingBook.Publisher = updatedBook.Publisher;
                existingBook.ISBN = updatedBook.ISBN;
                existingBook.Classification = updatedBook.Classification;
                existingBook.Category = updatedBook.Category;
                existingBook.PageCount = updatedBook.PageCount;
                existingBook.Price = updatedBook.Price;
                 
                _bookstoreContext.Books.Update(existingBook);
                _bookstoreContext.SaveChanges();

            }
            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _bookstoreContext.Books.Find(bookID);
            if (book == null)
            {
                return NotFound(new {message = "Book not found"});
            }
            
            _bookstoreContext.Books.Remove(book);
            _bookstoreContext.SaveChanges();
            return NoContent();
        }
    }
}





