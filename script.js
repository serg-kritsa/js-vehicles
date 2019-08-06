window.onload = function() {
  sendAjax("GET", "vehicles.json", true);

  function sendAjax(method, path, isAsync) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, path, isAsync);
    xhr.send();
    xhr.onload = function() {
      if (this.status === 200) {
        jsonResponse = JSON.parse(this.responseText);
        var collections = generateCollections(jsonResponse);
        fillTable("tbl_auto", collections.autos);
        fillTable("tbl_air", collections.airplanes);
        fillTable("tbl_boat", collections.boats);
      } else if (this.status === 404) {
        alert("Запрашиваемый ресурс не найден");
      }
      xhr.onerror = function() {
        alert("Ошибка запроса");
      };
    };
  }
};
function Vehicle(name, speed, capacity) {
  this.name = name;
  // максимальная скорость, вместимость
  this.speed = speed;
  this.capacity = capacity;
}
Vehicle.prototype.isCorrect = function() {
  var keys = Object.keys(this);
  for (var i in keys) {
    var key = keys[i];
    if (this[key] === 0 || this[key] === "") {
      console.warn("Некорректный элемент", this, key);
      return false;
    }
  }
  return true;
};
function Auto(name, speed, capacity, body) {
  Vehicle.call(this, name, speed, capacity);
  // тип кузова у автомобиля,
  this.body = body;
}
Auto.prototype = Object.create(Vehicle.prototype);
Auto.prototype.constructor = Auto;

function Airplane(name, speed, capacity, wingspan) {
  Vehicle.call(this, name, speed, capacity);
  // размах крыла у самолета
  this.wingspan = wingspan;
}
Airplane.prototype = Object.create(Vehicle.prototype);
Airplane.prototype.constructor = Airplane;

function Boat(name, speed, capacity, maxpower) {
  Vehicle.call(this, name, speed, capacity);
  // максимальная мощность мотора для катера
  this.maxpower = maxpower;
}
Boat.prototype = Object.create(Vehicle.prototype);
Boat.prototype.constructor = Boat;
function generateCollections(data) {
  var autos = [],
    airplanes = [],
    boats = [],
    unknownTypes = [];
  for (var element in data) {
    var vehicle = data[element];
    switch (vehicle.type) {
      case "auto":
        var auto = new Auto(
          vehicle.name,
          vehicle.speed,
          vehicle.capacity,
          vehicle.body
        );
        if (auto.isCorrect()) autos.push(auto);
        break;
      case "airplane":
        var airplane = new Airplane(
          vehicle.name,
          vehicle.speed,
          vehicle.capacity,
          vehicle.wingspan
        );
        if (airplane.isCorrect()) airplanes.push(airplane);
        break;
      case "boat":
        var boat = new Boat(
          vehicle.name,
          vehicle.speed,
          vehicle.capacity,
          vehicle.maxpower
        );
        if (boat.isCorrect()) boats.push(boat);
        break;
      default:
        unknownTypes.push(vehicle);
    }
  }
  if (unknownTypes.length > 0) {
    console.warn("Количество необработанных элементов", unknownTypes.length);
  }
  // console.log(autos, airplanes, boats);
  return {
    autos: autos,
    airplanes: airplanes,
    boats: boats,
    unknownTypes: unknownTypes
  };
}
function fillTable(tableName, collection) {
  if (tableName === "" || collection.length === 0) {
    return;
  }
  var table = document.getElementById(tableName);
  for (var i in collection) {
    const element = collection[i];
    var keys = Object.keys(element);
    var row = document.createElement("tr");
    for (let j in keys) {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(element[keys[j]]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}