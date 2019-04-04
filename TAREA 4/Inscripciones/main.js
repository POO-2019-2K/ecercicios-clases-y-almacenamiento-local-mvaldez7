
class main{
    constructor(){
        this._tabla = document.querySelector("#info");
        this._registros = [];
        this._initInfo();

        document.querySelector("#btnRegistrar").addEventListener("click", () => {
            let cuenta = document.querySelector("#cuenta").value;
            let nombre = document.querySelector("#nombre").value;

            let objRegistro = {
                cuenta: cuenta,
                nombre: nombre
            }

            this._addAlumno(objRegistro);
        });
    }

    _initInfo(){
        if (localStorage.getItem("alumnos")) {
            let registros = JSON.parse(localStorage.getItem("alumnos"));

            registros.forEach( (alumnoRegistrado) => {
                this._registros.push(alumnoRegistrado);
                this._showInfo(alumnoRegistrado);
            } );

            console.log(this._registros);
        }
    }

    _addAlumno(objRegistro){
        let find = this._findAlumno(objRegistro.cuenta);

        if (find >= 0) {
            alert("La cuenta ya esta registrada");
        }else{
            this._addToLocal(objRegistro);
            this._showInfo(objRegistro);
        }
    }

    _addToLocal(objRegistro){
        this._registros.push(objRegistro);
        localStorage.setItem("alumnos", JSON.stringify(this._registros));
    }


    _showInfo(objRegistro){
        let row = this._tabla.insertRow(-1);
        let cellCuenta = row.insertCell(0);
        let cellNombre = row.insertCell(1);

        cellCuenta.innerHTML = objRegistro.cuenta;
        cellNombre.innerHTML = objRegistro.nombre;
    }

    _findAlumno(cuenta){
        let foundAt = -1;
        this._registros.forEach((registro, index) => {
            if (registro.cuenta == cuenta) {
                foundAt = index;
            }
        });
        return foundAt;
    }
    
}

let m = new main;