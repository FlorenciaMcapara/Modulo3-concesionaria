let autos = require ('./autos')
let persona = require ('./persona')

let concesionaria = {
   autos: autos,
   
   buscarAuto:  patente => {
    for(let i=0;i<autos.length;i++){
        if(autos[i].patente === patente) return autos[i];
    }
    console.log('Autos: ',autos)
    return null
},

   venderAuto: function(patente){
      let buscar = this.buscarAuto(patente)
      if(buscar != null) buscar.vendido= true
   },

autosParaLaVenta: ()=>{
   let stockAutos = autos.filter(function(auto){
       if(auto.vendido== false) return auto;
})
return stockAutos;
   },
   
   autosNuevos: function(){
      let disponible = this.autosParaLaVenta()
      let ceroKms = disponible.filter(function(ceroKm){
            if(ceroKm.km<100) return ceroKm
      })
      return ceroKms
   },

   listaDeVentas: function(){
      let autosVendidos = autos.filter(function(autoVendido){
      if(autoVendido.vendido == true) return autoVendido

      })
     let precioAuto = []
     autosVendidos.forEach(autoVendido =>{
      precioAuto.push(autoVendido.precio)
     })
     return precioAuto
   },

   totalDeVentas: function(){
      let totalVentas = this.listaDeVentas().reduce(function(acum, venta){
            return acum + venta
        })
       return totalVentas
    },
   
   puedeComprar: function(auto,persona){
      let comprarOk = false
      let difCapacidadCosto = persona.capacidadDePagoTotal - auto.precio
        let difCapacidadPagoCuota = persona.capacidadDePagoEnCuotas -     (auto.precio / auto.cuotas)
        if(difCapacidadCosto >= 0 && difCapacidadPagoCuota >= 0){
           comprarOk = true
        }
        return comprarOk
    },

   autosQuePuedeComprar: 
   function(persona){
   let autosDisponiblesVenta = this.autosParaLaVenta()
        let stock = []
        autosDisponiblesVenta.forEach(function(comprarOk){
            let puedeComprar = concesionaria.puedeComprar(comprarOk, persona)
            if(puedeComprar){
                stock.push(comprarOk)
            }
        })
        console.log('Puedes comprar: ', autosDisponiblesVenta)
        return stock
    }
   
}