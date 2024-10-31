const calculate = () => {
    const name = document.getElementById('name').value.trim();
    let price = Number(document.getElementById('startingbid').value);
    const education = parseFloat(document.getElementById('education').value);
    const networth = parseFloat(document.getElementById('networth').value);
    const caste = parseInt(document.getElementById('caste').value);
    const loveLetter = document.getElementById('loveLetter').value.trim();

    if (!name || !price) {
        alert('PYou have to enter name and starting bid!');
        return;
    }

    const skills = Array.from(document.getElementsByClassName('skills'));
    const skillsBonus = skills.filter(skill => skill.checked).reduce((sum, skill) => sum + Number(skill.value), 0);

    const age = parseFloat(document.querySelector('input[name="age"]:checked').value);

    let reputationMultiplier = 1;
    let reputationPenalty = 0;
    document.querySelectorAll('.reputation:checked').forEach(rep => {
        const value = parseFloat(rep.value);
        if (value < 0) {
            reputationPenalty += value;
        } else {
            reputationMultiplier *= value;
        }
    });

    let finalPrice = price * education * networth * age * reputationMultiplier + caste + skillsBonus + reputationPenalty;

    const person = {
        name: name,
        price: finalPrice.toFixed(2),
        letter: loveLetter
    };

    document.getElementById('resultText').innerHTML = `
        The price for ${person.name} is $${person.price}.
        <br>Love letter: "${person.letter || 'Please enter your love letter if needed.'}"
    `;

};

document.getElementById('submit').addEventListener('click', calculate);