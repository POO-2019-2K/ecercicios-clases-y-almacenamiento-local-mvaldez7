class main{
    constructor(){
        this._tabla = document.querySelector("#info");
        this._movientos = [];
        this._tipoDeMovimiento = "";
        this._saldo = 0;
        this._initData();

        document.querySelector("#btnRetiro").addEventListener("click", () => {
            this._tipoDeMovimiento = "Retiro";
            this._realizaMovimiento();
        });

        document.querySelector("#btnDeposito").addEventListener("click", () => {
            this._tipoDeMovimiento = "Deposito";
            this._realizaMovimiento();
        });
    }

    _initData(){
        if (localStorage.getItem("saldos")) {
            let movimientos = JSON.parse(localStorage.getItem("saldos"));

            movimientos.forEach(movimiento => {
                this._movientos.push(movimiento);
                this._showInfo(movimiento);
            });

            this._saldo = movimientos[movimientos.length-1].saldo;
        }
    }

    _realizaMovimiento(){
        let cantidad = document.querySelector("#cantidad").value;
        
        if (this._tipoDeMovimiento == "Deposito") {
            this._saldo += Number(cantidad);
        }else if(this._tipoDeMovimiento == "Retiro"){
            if (cantidad > this._saldo) {
                alert("No es posible retirar esa cantidad");
            }else{
                this._saldo -= Number(cantidad);    
            }
        }

        let objMovimiento = {
            movimiento: this._tipoDeMovimiento,
            monto: cantidad,
            saldo: this._saldo
        }
    
        this._addToLocalStorage(objMovimiento);
    }

    _addToLocalStorage(objMovimiento){       
        this._movientos.push(objMovimiento);
        localStorage.setItem("saldos", JSON.stringify(this._movientos));
        this._showInfo(objMovimiento);
    }

    _showInfo(cuenta){
        let row = this._tabla.insertRow(-1);
        let cellTipo = row.insertCell(0);
        let cellMonto = row.insertCell(1);
        let cellSaldo = row.insertCell(2);

        cellTipo.innerHTML = cuenta.movimiento;
        cellMonto.innerHTML = cuenta.monto;
        cellSaldo.innerHTML = cuenta.saldo;
    }   
}

let m = new main();