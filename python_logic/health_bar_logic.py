def calcHP(maxHP, currentHP, barHPMax):
    # Formula takes max bar HP, and scales it by the scalar value retrieved from current entity HP devided by max entity HP.
    return barHPMax * (currentHP / maxHP)

# Example useage where the entity has a max HP of 250 which is over the barHP limit. 
# They have been damaged for 40 HP, hence the current 210 HP value. The bar can only fit 100 HP.
# This will print a scaled value to fit the bar so we can accurately reflect the damage amount to the user without overflowing the bar
print(calcHP(250, 210, 100))