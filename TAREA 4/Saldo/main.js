class main{
    constructor(){
        this._tabla = document.querySelector("#info");
        this._saldos = [];
        this._tipoDeMovimiento = "";
        this._initData();

        document.querySelector("#btnRetiro").addEventListener("click", () => {
            this._tipoDeMovimiento = "retiro";
            this._realizaMovimiento();
        });

        document.querySelector("#btnDeposito").addEventListener("click", () => {
            this._tipoDeMovimiento = "deposito";
            this._realizaMovimiento();
        });
    }

    _initData(){
        if (localStorage.getItem("saldos")) {
            let cuentas = JSON.parse(localStorage.getItem("saldos"));

            cuentas.forEach(cuenta => {
                this._saldos.push(cuenta);
                this._showInfo(cuenta);
            });
        }
    }

    _realizaMovimiento(){
        let numero = document.querySelector("#cuenta").value;
        let cantidad = document.querySelector("#cantidad").value;

        let objMovimiento = {
            cuenta: numero,
            saldo: cantidad
        }
    
        this._askForAccount(objMovimiento);
    }

    _askForAccount(objMovimiento){
        let found = this._foundAccount(objMovimiento);
        
        if (found >= 0) {  
            this._updateSaldos(found, objMovimiento);
        }else{
            this._addToLocalStorage(objMovimiento);
        }
    }

    _updateSaldos(found, objMovimiento){
        if (this._tipoDeMovimiento == "deposito") {                
            this._saldos[found].saldo = Number(this._saldos[found].saldo) + Number(objMovimiento.saldo);
        }else if(this._tipoDeMovimiento == "retiro"){
            if (Number(this._saldos[found].saldo) < Number(objMovimiento.saldo)) {
                alert("No es posible retirar esa cantidad");
            }else{
                this._saldos[found].saldo = Number(this._saldos[found].saldo) - Number(objMovimiento.saldo);
            }
        }  
        
        localStorage.setItem("saldos", JSON.stringify(this._saldos));
        this._tabla.rows[found+1].cells[0].innerHTML = this._saldos[found].cuenta;
        this._tabla.rows[found+1].cells[1].innerHTML = this._saldos[found].saldo;
    }

    _foundAccount(objCuenta){
        let foundAt = -1;

        this._saldos.forEach( (cuenta, index) => {
            if (objCuenta.cuenta == cuenta.cuenta) {
                foundAt = index;   
            }
        });
        return foundAt;
    }

    _addToLocalStorage(objMovimiento){       
        this._saldos.push(objMovimiento);
        localStorage.setItem("saldos", JSON.stringify(this._saldos));
        this._showInfo(objMovimiento);
    }

    _showInfo(cuenta){
        let row = this._tabla.insertRow(-1);
        let cellCuenta = row.insertCell(0);
        let cellSaldo = row.insertCell(1);

        cellCuenta.innerHTML = cuenta.cuenta;
        cellSaldo.innerHTML = cuenta.saldo;
    }   
}

let m = new main();