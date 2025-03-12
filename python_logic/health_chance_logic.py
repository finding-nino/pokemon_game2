# health_chance_logic.py
import random

# Need to save the default value for percentage of damage
hp = 220
hp_def = hp

# Need to save default value for chance incrementation
chance = 0.1
chance_def = chance

# Scalar clamp. Chance will never go above this value, at least, it isn't intended to.
# Sometimes it will because we are simply adding but it will never go over far.
clamp_max = 0.7

# Function to roll the dice on a catch call, dependent on the current hp affected chance
def catch():
    global chance

    r = random.uniform(0, 1)

    if r <= chance:
        print("pass")
    else:
        print("fail")

# Function to damage the entity and increment its catching chance at the same time
def damage():
    global hp, chance

    print(chance)

    # If HP is bigger then 0, AKA entity is still aive, it will continue to decrement and calculate chance. Otherwise, it doesn't do anything.
    if hp > 0:
        # Formula for catching chance. 
        #
        # Damage percentage is first subtracted from 100%. Without this subtraction, the chance would go down instead of up. We then multiply this by the clamp value to ensure it never goes far over. 
        # Finally, the calculated number is added raw to the default chance.
        chance = ((1-(hp/hp_def))*clamp_max)+chance_def

        # Simply decrements the HP value
        hp -= 2

# Simply to test. Damage and catch are called 100 times each to see if the logic works proper
for i in range(100):
    damage()
    catch()