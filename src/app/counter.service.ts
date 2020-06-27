export class CounterService{
    activeToInactiveCounter = 0;
    inactiveToActiveCounter = 0;

    incremetActiveToInactive(){
        this.activeToInactiveCounter++;    
    }

    incremetInActiveToActive(){
        this.inactiveToActiveCounter++;    
    }
    
}