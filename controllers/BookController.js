const Book = require('../schema/bookSchema');

const addBook=async(req,res)=>{
    const {title,author,genre,publishedYear,isbn,stockCount}=req.body;

    if(!title || !author || !genre || !publishedYear || !isbn || !stockCount){
        return res.status(400).json({error:"All fields are required"});
    }
    try {
        const newBook=await Book.create({
            title,
            author,
            genre,
            publishedYear,
            isbn,
            stockCount
        })
        res.status(201).json({message:"Book added successfully"});
    } catch (error) {
        console.log("error while adding book",error);
        res.status(500).json({error:"Failed to add book"});
    }
}
const getAllBooksInPaginatedForm = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // console.log(page, limit);

        const books = await Book.find()
            .skip(skip)
            .limit(limit)
            .select('title author genre publishedYear isbn stockCount');

        const totalBooks = await Book.countDocuments();
        const totalPages = Math.ceil(totalBooks / limit);

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: totalPages,
            totalBooks: totalBooks,
            booksPerPage: limit,
            data: books
        });

    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({
            error: "Error fetching books",
        });
    }
};



const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            data: book
        });

    } catch (error) {
        console.log("Error fetching book By Id:", error);
        res.status(500).json({
            error:"Error fetching book By Id",
        });
    }
};

const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const updates = req.body;

        const book = await Book.findByIdAndUpdate(
            bookId,
            updates,
            { new: true, runValidators: true }
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book updated successfully",
            data: book
        });

    } catch (error) {
        console.log("Error updating book:", error);
        res.status(500).json({
            error: "Error updating book",
        });
    }
};

const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findByIdAndDelete(bookId);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully",
            data: book
        });

    } catch (error) {
        console.log("Error deleting book:", error);
        res.status(500).json({
            error: "Error deleting book",
        });
    }
};

const fuzzySearch=async(req,res)=>{
    try {
        const searchTerm = req.query.qname;
        const fuzzyPattern = searchTerm.split('').join('.*');
        const searchRegex = new RegExp(fuzzyPattern, 'i');
        const books = await Book.find({
            $or: [
                { title: searchRegex },
                { author: searchRegex },
                { genre: searchRegex }
            ]
        });

        res.status(200).json({
            data: books
        });
    } catch (error) {
        console.log("Error fetching books:", error);
        res.status(500).json({
            error: "Error fetching books",
        });
    }
}

module.exports = {
    addBook,
    getAllBooksInPaginatedForm,
    getBookById,
    updateBook,
    deleteBook,
    fuzzySearch
};