Variable global:
- espaciosDisponibles (inicializado con la cantidad máxima de espacios)
int Espacios_Disponibles = 10;

Semaforos:
- semaphoreEspacios (inicializado con el valor de espaciosDisponibles)
 Semaforo semaforoEspacios = Espacios_Disponibles;
- semaphoreBarrera (inicializado en 1, permitiendo solo un vehículo a la vez)
 Semaforo semaforoBarrera = 1;

Proceso Barrera Entrada:
función ControlarBarreraEntrada(idBarrera) {

    mientras BarreraAbierta(idBarrera) {

        semaforoEspacios.wait(); // Esperar a que haya espacio disponible DOWN sobre el semaforo 
        AbrirBarrera(idBarrera);
        semaforoBarrera.wait(); // Bloquear la barrera para evitar que otros vehículos entren DOWN sobre el semaforo

        mientras DetectaAuto(idBarrera) {}
        
        CerrarBarrera(idBarrera);
        semaforoBarrera.signal(); // Liberar la barrera después de que el vehículo haya estacionado UP sobre el semaforo
    
    }
}

Proceso Barrera Salida:
función ControlarBarreraSalida(idBarrera) {

    mientras BarreraAbierta(idBarrera) {

        semaforoBarrera.wait(); // Bloquear la barrera para evitar que otros vehículos salgan DOWN sobre el semaforo

        si PagoAutorizado(idBarrera) entonces {
            AbrirBarrera(idBarrera);
            mientras DetectaAuto(idBarrera) {}
            CerrarBarrera(idBarrera);
            semaforoBarrera.signal(); // Liberar la barrera después de que el vehículo haya salido completamente UP sobre el semaforo
            semaforoEspacios.signal(); // Incrementar la cantidad de espacios disponibles UP sobre el semaforo
        } sino {
            semaforoBarrera.signal(); // Liberar la barrera sin permitir que el vehículo salga
        }
    }
}
