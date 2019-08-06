describe("generateCollections", function() {
  describe("checking propertis", function() {
    empty = generateCollections([]);
    keysLength = Object.keys(empty).length;
    it("should be "+keysLength+" keys in return object", function() {
      keys = ["autos", "airplanes", "boats", "unknownTypes"];
      assert.equal(keysLength, keys.length);
    });
    it("should have property autos", function() {
      empty.should.have.property("autos");
    });
    it("should have property airplanes", function() {
      empty.should.have.property("airplanes");
    });
    it("should have property boats", function() {
      empty.should.have.property("boats");
    });
  });

  describe("checking filling", function() {
    it("should have 2 autos", function() {
      data = [
        {
          type: "auto",
          name: "Mazda MX-5",
          speed: 180,
          capacity: 2,
          body: "roadster"
        },
        {
          type: "auto",
          name: "Lexus IS250",
          speed: 200,
          capacity: 5,
          body: "sedan"
        }
      ];
      collection = generateCollections(data);
      collection.should.have.property("autos").with.lengthOf(data.length);
    });
    it("should have 2 airplanes", function() {
      data = [
        {
          type: "airplane",
          name: "Tu-154",
          speed: 950,
          capacity: 180,
          wingspan: 37.55
        },
        {
          type: "airplane",
          name: "Airbus A320",
          speed: 910,
          capacity: 180,
          wingspan: 34.1
        }
      ];
      collection = generateCollections(data);
      collection.should.have.property("airplanes").with.lengthOf(data.length);
    });
    it("should have 2 boats", function() {
      data = [
        {
          type: "boat",
          name: "QuickSilver Activ 470 Cabin",
          speed: 50,
          capacity: 4,
          maxpower: 80
        },
        {
          type: "boat",
          name: "Corvet 750",
          speed: 80,
          capacity: 8,
          maxpower: 300
        }
      ];
      collection = generateCollections(data);
      collection.should.have.property("boats").with.lengthOf(data.length);
    });
  });
  describe("checking broken data", function() {
    it("should have 1 in unknownTypes", function() {
      data = [
        {
          type: "aut---------------",
          name: "Lexus IS250",
          speed: 200,
          capacity: 5,
          body: "sedan"
        }
      ];
      collection = generateCollections(data);
      collection.should.have
        .property("unknownTypes")
        .with.lengthOf(data.length);
    });
    it("should have 0 broken autos", function() {
      data = [
        {
          type: "auto",
          name: "",
          speed: 180,
          capacity: 2,
          body: "roadster"
        },
        {
          type: "auto",
          name: "Lexus IS250",
          speed: 0,
          capacity: 5,
          body: "sedan"
        },
        {
          type: "auto",
          name: "",
          speed: 180,
          capacity: 0,
          body: "roadster"
        },
        {
          type: "auto",
          name: "Lexus IS250",
          speed: 0,
          capacity: 5,
          body: ""
        }
      ];
      autos = generateCollections(data);
      autos.should.have.property("autos").with.lengthOf(0);
    });
    it("should have 0 broken airplanes", function() {
      data = [
        {
          type: "airplane",
          name: "",
          speed: 950,
          capacity: 180,
          wingspan: 37.55
        },
        {
          type: "airplane",
          name: "Airbus A320",
          speed: 0,
          capacity: 180,
          wingspan: 34.1
        },
        {
          type: "airplane",
          name: "Tu-154",
          speed: 950,
          capacity: 0,
          wingspan: 37.55
        },
        {
          type: "airplane",
          name: "Airbus A320",
          speed: 910,
          capacity: 180,
          wingspan: 0
        }
      ];
      airplanes = generateCollections(data);
      airplanes.should.have.property("airplanes").with.lengthOf(0);
    });
    it("should have 0 broken boats", function() {
      data = [
        {
          type: "boat",
          name: "",
          speed: 50,
          capacity: 4,
          maxpower: 80
        },
        {
          type: "boat",
          name: "Corvet 750",
          speed: 0,
          capacity: 8,
          maxpower: 300
        },
        {
          type: "boat",
          name: "QuickSilver Activ 470 Cabin",
          speed: 50,
          capacity: 0,
          maxpower: 80
        },
        {
          type: "boat",
          name: "Corvet 750",
          speed: 80,
          capacity: 8,
          maxpower: 0
        }
      ];
      boats = generateCollections(data);
      boats.should.have.property("boats").with.lengthOf(0);
    });
  });
});
