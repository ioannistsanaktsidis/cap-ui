const responses = {
  deposit: {
    success: {
      status: "200",
      data: {
        status: "200",
        data: {}
      }
    },
    validationError : {
      status: "400",
      data: {
        status: "400",
        data: {}
      }
    }
  },
  records: {
    validationError : {
      status: "400",
      data: {
        status: "400",
        data: {}
      }
    }
  },
  search: {
    "error": {
      status: "400",
      data: {
        status: "400",
        data: {}
      }
    },
    "serverError": {
      status: "500",
      data: {
        status: "500",
        data: {}
      }
    },
  },
  user: {
    me: {
      status: 200,
      data: {

      }
    },
    unauthorized: {
      status: 401,
      message: "The server could not verify that you are authorized to access the URL requested.  You either supplied the wrong credentials (e.g. a bad password), or your browser doesn't understand how to supply the credentials required."
    }
  }
};

export default responses;