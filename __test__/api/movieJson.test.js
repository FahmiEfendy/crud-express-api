const _ = require("lodash");
const Request = require("supertest");

const GeneralHelper = require("../../server/helpers/generalHelper");
const MoviePlugin = require("../../server/api/movie");

const { reqAddMovie, reqUpdateMovie } = require("../../utils/movie.test.data");

let apiUrl;
let id;

describe("GET Movie", () => {
  beforeAll(() => {
    server = GeneralHelper.createTestServer("/movie", MoviePlugin);
  });

  afterAll(async () => {
    await server.close();
  });

  describe("Movie", () => {
    beforeEach(() => {
      apiUrl = "/movie";
    });

    test("Should Return 200: GET All Movie", async () => {
      await Request(server)
        .get(apiUrl)
        .expect(200)
        .then((res) => {
          expect(!_.isEmpty(res.body.data)).toBeTruthy();
          expect(res.body.data.length).toBe(10);

          const testData = _.find(
            res.body.data,
            (item) => item.title.toLowerCase() === "avatar"
          );
          expect(!_.isEmpty(testData)).toBeTruthy();
        });
    });

    test("Should Return 200: GET Movie By Id", async () => {
      id = 1;
      await Request(server)
        .get(`${apiUrl}/${id}`)
        .expect(200)
        .then((res) => {
          expect(!_.isEmpty(res.body.data)).toBeTruthy();
          expect(res.body.data.length).toBe(1);

          const testData = _.find(
            res.body.data,
            (item) => item.title.toLowerCase() === "inception" // Title from reqAdd
          );
          expect(!_.isEmpty(testData)).toBeTruthy();

          const testData2 = _.find(
            res.body.data,
            (item) => item.title.toLowerCase() === "avatar"
          );
          expect(_.isEmpty(testData2)).toBeTruthy();
        });
    });

    test("Should Return 200: GET Movie By Id Without Result", async () => {
      id = 11;
      await Request(server)
        .get(`${apiUrl}/${id}`)
        .expect(200)
        .then((res) => {
          expect(_.isEmpty(res.body.data)).toBeTruthy();
          expect(res.body.data.length).toBe(0);

          const testData2 = _.find(
            res.body.data,
            (item) => item.title.toLowerCase() === "avatar"
          );
          expect(_.isEmpty(testData2)).toBeTruthy();
        });
    });
  });
});

describe("CRUD Movie", () => {
  beforeAll(() => {
    server = GeneralHelper.createTestServer("/movie", MoviePlugin);
  });

  afterAll(async () => {
    await server.close();
  });

  describe("Movie", () => {
    beforeEach(() => {
      apiUrl = "/movie";
    });

    test("Should Create New Movie", async () => {
      await Request(server)
        .post(apiUrl)
        .send(reqAddMovie)
        .expect(201)
        .then(({ body }) => {
          id = body.data.id;
        });
    });

    test("Should Get Created Movie Detail", async () => {
      await Request(server)
        .get(`${apiUrl}/${id}`)
        .expect(200)
        .then((res) => {
          expect(!_.isEmpty(res.body.data)).toBeTruthy();
          expect(res.body.data.length).toBe(1);
          const testData = _.find(
            res.body.data,
            (item) => item.title.toLowerCase() === "test add movie" // Title from reqAdd
          );
          expect(!_.isEmpty(testData)).toBeTruthy();
          const testData2 = _.find(
            res.body.data,
            (item) => item.title.toLowerCase() === "avatar"
          );
          expect(_.isEmpty(testData2)).toBeTruthy();
        });
    });

    test("Should Update New Movie", async () => {
      console.log(id, "<<<ID");
      console.log(reqUpdateMovie, "<<<update");
      await Request(server)
        .patch(`${apiUrl}/${id}`)
        .send(reqUpdateMovie)
        .expect(201)
        .then((res) => console.log(res, "<<<Res"));
    });

    test("Should Get Updated Movie Detail", async () => {
      await Request(server)
        .get(`${apiUrl}/${id}`)
        .expect(200)
        .then((res) => {
          const testData = _.find(
            res.body.data,
            (item) => item.title.toLowerCase() === "test update movie"
          ); //Title from reqUpdate
          expect(!_.isEmpty(testData)).toBeTruthy();
        });
    });

    test("Should Delete Created Movie", async () => {
      await Request(server).delete(`${apiUrl}/${id}`).expect(200);
    });

    test("Should Not Get Deleted Movie", async () => {
      await Request(server)
        .get(`${apiUrl}/${id}`)
        .expect(200)
        .then((res) => {
          const testData = _.find(res.body.data, (item) => item.id === id);
          expect(_.isEmpty(testData)).toBeTruthy();
        });
    });
  });
});
