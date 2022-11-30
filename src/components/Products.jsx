import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const LatestBooks = () => {
  const URL_API = "https://api.itbook.store/1.0/search/java";
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getProducts = async () => {
      fetch(URL_API)
        .then((res) => res.json())
        .then((res) => {
          setBooks(res.books);
          setLoading(false);
        });
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        {books.map((book) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4" key={book.isbn13}>
                  <img
                    src={book.image}
                    className="card-img-top"
                    alt={book.title}
                    height="300px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">{book.title}</h5>
                    <p className="card-text fw-bold">{book.price}</p>
                    <Link
                      to={`/books/${book.isbn13}`}
                      className="btn btn-outline-dark">
                      Detalles
                    </Link>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-4 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Our books</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default LatestBooks;
