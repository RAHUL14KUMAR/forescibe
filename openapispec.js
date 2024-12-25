const openApi={
    openapi: "3.0.0",
    info: {
        title: "User API",
        description: "API to manage users",
        version: "1.0.0"
    },
    servers: [
        {
        url: "http://localhost:8000",
        description: "Local development server"
        }
    ],
    paths:{
        "/":{
            get:{
                summary: "Greeting from server",
                description: "Endpoint to verify that the server is running",
                responses: {
                "200": {
                    description: "Successful response",
                    content: {
                        "application/json": {
                            schema: {
                            type: "array",
                            $ref:"#/components/schemas/bookSchema"
                            }
                        }
                    }
                }
                }
            }
        },
        "/book":{
            get:{
                summary:"Get all books",
                parameters:[
                    {
                        in:"query",
                        name:"page",
                        schema:{
                            type:"integer",
                        },
                        description:"Page number",
                    },
                    {
                        in:"query",
                        name:"limit",
                        schema:{
                            type:"integer",
                        },
                        description:"Number of books per page",
                    }
                ],
                responses:{
                    "200":{
                        description:"Success",
                        content:{
                            "application/json":{
                                schema:{
                                    type:"array",
                                    items:{
                                        $ref:"#/components/schemas/bookSchema",
                                    },
                                },
                            },
                        },
                    },
                    
                },
            },
            post:{
                summary:"Add a new book",
                requestBody:{
                    required:true,
                    content:{
                        "application/json":{
                            schema:{
                                $ref:"#/components/schemas/Book",
                            },
                        },
                    },
                },
                responses:{
                    "201":{
                        description:"Book added successfully",
                    },
                    "500":{
                        description:"Internal server error",
                    }
                },
            },
        },
        "/book/{id}":{
            get:{
                summary:"Get a book by ID",
                parameters:[
                    {
                        in:"path",
                        name:"id",
                        schema:{
                            type:"string",
                        },
                        required:true,
                        description:"Book ID",
                    },
                ],
                responses:{
                    "200":{
                        description:"Book found",
                        content:{
                            "application/json":{
                                schema:{
                                    type:"object",
                                    $ref:"#/components/schemas/bookSchema",
                                },
                            },
                        },
                    },
                    "404":{
                        description:"Book not found",
                    },
                    "500":{
                        description:"Internal server error",
                    }
                },
            },
            put:{
                summary:"Update a book by ID",
                parameters:[
                    {
                        in:"path",
                        name:"id",
                        schema:{
                            type:"string",
                        },
                        required:true,
                        description:"Book ID",
                    },
                ],
                requestBody:{
                    required:true,
                    content:{
                        "application/json":{
                            schema:{
                                $ref:"#/components/schemas/updateSchema",
                            },
                        },
                    },
                },
                responses:{
                    "200":{
                        description:"Book updated successfully",
                        data:{
                            type:"object",
                            $ref:"#/components/schemas/bookSchema",
                        }
                    },
                    "404":{
                        description:"Book not found",
                    },
                    "500":{
                        description:"Internal server error",
                    }
                },
            },
            delete:{
                summary:"Delete a book by ID",
                parameters:[
                    {
                        in:"path",
                        name:"id",
                        schema:{
                            type:"string",
                        },
                        required:true,
                        description:"Book ID",
                    },
                ],
                responses:{
                    "200":{
                        description:"Book deleted successfully",
                    },
                    "404":{
                        description:"Book not found",
                    },
                    "500":{
                        description:"Internal server error",
                    }
                },
            }
        },
        "/book/search/query":{
            get:{
                summary:"Fuzzy Search books by query",
                parameters:[
                    {
                        in:"query",
                        name:"qname",
                        schema:{
                            type:"string",
                        },
                        required:true,
                        description:"Search query",
                    },
                ],
                responses:{
                    "200":{
                        description:"Books found",
                        content:{
                            "application/json":{
                                schema:{
                                    type:"array",
                                    items:{
                                        $ref:"#/components/schemas/bookSchema",
                                    },
                                },
                            },
                        },
                    },
                    "404":{
                        description:"Books not found",
                    },
                    "500":{
                        description:"Internal server error",
                    }
                },
            }
        }
    },
    components:{
        schemas:{
            bookSchema:{
                type:"object",
                properties:{
                    title: {
                        type: "string",
                    },
                    author: {
                        type: "string",
                    },
                    genre: {
                        type: "string",
                    },
                    publishedYear: {
                        type: "number",
                    },
                    isbn: {
                        type: "string",
                        unique: true
                    },
                    stockCount: {
                        type:"number",
                        default: 0
                    }
                },
                required:["title","author","genre","publishedYear","isbn","stockCount"]
            },
            updateSchema:{
                type:"object",
                properties:{
                    title: {
                        type: "string",
                    },
                    author: {
                        type: "string",
                    },
                    genre: {
                        type: "string",
                    },
                    publishedYear: {
                        type: "number",
                    },
                    isbn: {
                        type: "string",
                        unique: true
                    },
                    stockCount: {
                        type:"number",
                        default: 0
                    }
                },
            }
        }
    }
}

module.exports={openApi}