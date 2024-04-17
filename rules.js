class Start extends Scene {
    create() {

        //console.log(this.engine.storyData)
    


        this.engine.setTitle("Cabin in the woods"); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, "Enter Forest"); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        console.log(locationData)

        if (locationData.Object) {
            console.log("Found: " + locationData.Object)
            this.engine.storyData.Inventory.push(locationData.Object)
        }

        if (locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                if (choice.Target == "Receive Key" && 
                    this.engine.storyData.Inventory.includes("Key")) {
                        continue
                    }
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
        if (locationData.HiddenChoice) {
            if (this.engine.storyData.Inventory.includes("Key"))  {
                this.engine.addChoice(locationData.HiddenChoice.Text, locationData.HiddenChoice);
            }
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');