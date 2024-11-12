const delay = 2000; // Global variable for delay in milliseconds

class Baby {
    constructor(name, birthdate = new Date(), height = 20, weight = 130) {
        this.name = name;
        this.birthdate = birthdate;
        this.height = height;
        this.weight = weight;
        this.feedingsSinceLastPoop = 0;
        this.drinksSinceLastPee = 0;
        this.actions = 0;
        this.sleepCount = 0;
        this.eatCount = 0;
        this.fartCount = 0;
        this.updateStatus();
    }

    updateStatus() {
        const statusDiv = document.getElementById('status');
        statusDiv.innerHTML = `
            <p>Name: ${this.name}</p>
            <p>Weight: ${this.weight} oz</p>
            <p>Height: ${this.height} in</p>
            <p>Feedings Since Last Poop: ${this.feedingsSinceLastPoop}</p>
            <p>Drinks Since Last Pee: ${this.drinksSinceLastPee}</p>
            <p>Actions: ${this.actions}</p>
            <p>Sleep Count: ${this.sleepCount}</p>
        `;
    }

    laugh() {
        console.log("Baby is laughing");
        this.updateStatus();
        return "happy";
    }

    cry() {
        console.log("Baby is crying");
        this.performAction();
        this.updateStatus();
        return "sad";
    }

    sleep() {
        console.log("Baby is sleeping");
        this.sleepCount++;
        this.pause(delay / 1000);
        if (this.sleepCount % 2 === 0) {
            this.snore();
        }
        this.pause(delay / 1000);
        this.updateStatus();
        return "content";
    }

    snore() {
        console.log("Baby is snoring");
        this.pause(delay / 1000);
    }

    drink() {
        console.log("Baby is drinking");
        this.weight += 8;
        this.drinksSinceLastPee++;
        this.performAction();
        this.updateStatus();
        return "content";
    }

    scream() {
        console.log("Baby is screaming");
        this.pause(delay / 1000);
        this.updateStatus();
        return "mad";
    }

    eat() {
        const foods = ["vegetables", "fruit", "cereal"];
        const food = foods[Math.floor(Math.random() * foods.length)];
        console.log(`Baby is eating ${food}`);
        this.weight += 11;
        this.feedingsSinceLastPoop++;
        this.eatCount++;
        this.performAction();
        this.updateStatus();

        if (this.eatCount % 2 === 0) {
            this.fart();
        }
        if (this.eatCount % 3 === 0) {
            this.shart();
        }

        if (food === "fruit" || food === "goodies") {
            return this.laugh();
        } else if (food === "vegetables") {
            return this.cry();
        } else if (food === "cereal") {
            return this.sleep();
        }
    }

    kiss() {
        console.log("Baby is kissed");
        return this.laugh();
    }

    hug() {
        console.log("Baby is hugged");
        return this.laugh();
    }

    burp() {
        console.log("Baby is burping");
        this.updateStatus();
        return "happy";
    }

    poop() {
        console.log("Baby is pooping");
        this.weight -= 5;
        this.feedingsSinceLastPoop = 0;
        this.updateStatus();
        return "content";
    }

    pee() {
        console.log("Baby is peeing");
        this.weight -= 4;
        this.drinksSinceLastPee = 0;
        this.updateStatus();
        return "content";
    }

    fart() {
        console.log("Baby is farting");
        this.updateStatus();
        return "happy";
    }

    shart() {
        console.log("Baby is sharting");
        this.scream();
        this.updateStatus();
        return "mad";
    }

    performAction() {
        this.actions++;
        if (this.actions % 3 === 0) {
            if (this.feedingsSinceLastPoop >= 3) {
                this.poop();
            }
            if (this.drinksSinceLastPee >= 3) {
                this.pee();
            }
            if (this.actions % 6 === 0) {
                this.burp();
            }
        }
    }

    pause(seconds) {
        const start = new Date().getTime();
        while (new Date().getTime() < start + seconds * 1000);
    }

    die() {
        console.log("Baby has died");
        alert("The baby has died!");
        window.location.reload();
    }
}

let baby = new Baby("Shawn");
let babyCount = 1;

function createNewBaby() {
    const name = prompt("Enter the baby's name:", "New Baby");
    if (name) {
        baby = new Baby(name);
        babyCount++;
        document.getElementById('baby-count').innerText = `Number of Babies: ${babyCount}`;
        automateBaby();
    }
}

function automateBaby() {
    const actions = ["laugh", "cry", "sleep", "drink", "eat", "scream"];
    let actionCount = 0;

    const interval = setInterval(() => {
        if (baby.weight >= 390 || baby.sleepCount >= 6) {
            clearInterval(interval);
            console.log("Simulation ended");
            console.log(`Final weight: ${baby.weight} oz`);
            console.log(`Final sleep count: ${baby.sleepCount}`);
            return;
        }

        const action = actions[Math.floor(Math.random() * actions.length)];
        switch (action) {
            case "laugh":
                baby.laugh();
                break;
            case "cry":
                baby.cry();
                break;
            case "sleep":
                // Baby only sleeps after being fed cereal
                break;
            case "drink":
                baby.drink();
                break;
            case "eat":
                baby.eat();
                break;
            case "scream":
                baby.scream();
                break;
        }

        if (baby.weight <= 0) {
            baby.die();
            clearInterval(interval);
        }

        actionCount++;
    }, delay);
}

automateBaby();