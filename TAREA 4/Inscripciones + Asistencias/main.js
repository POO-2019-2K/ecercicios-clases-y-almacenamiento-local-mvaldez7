
class main{
    constructor(){
        this._tabla = document.querySelector("#info");
        this._registros = [];
        this._initInfo();

        document.querySelector("#btnRegistrar").addEventListener("click", () => {
            let numCuenta = document.querySelector("#cuenta").value;
            let nombre = document.querySelector("#nombre").value;

            let objRegistro = {
                cuenta: numCuenta,
                nombre: nombre,
                asistencias: 0
            }

            this._addAlumno(objRegistro);
        });

        document.querySelector("#btnAsistencias").addEventListener("click", () => {
            let numCuenta = document.querySelector("#cuenta").value;

            this._registros.forEach( (cuenta, index) => {
                if (cuenta.cuenta == numCuenta) {
                    cuenta.asistencias++;
            
                    localStorage.setItem("alumnos", JSON.stringify(this._registros));
                    this._tabla.rows[index+1].cells[0].innerHTML = cuenta.cuenta;
                    this._tabla.rows[index+1].cells[1].innerHTML = cuenta.nombre;
                    this._tabla.rows[index+1].cells[2].innerHTML = cuenta.asistencias;
                }else{
                    alert("El numero de cuenta no esta registrado");
                }
            });
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
        let cellAsistencias = row.insertCell(2);

        cellCuenta.innerHTML = objRegistro.cuenta;
        cellNombre.innerHTML = objRegistro.nombre;
        cellAsistencias.innerHTML = objRegistro.asistencias;
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