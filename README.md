# MMP2.0 Back office Automation

For using this repo, use the following command.

Git Clone:
git clone git@github.com:vanilla-8s/MMP2-BO-Automation.git

Open the cloned repository and open terminal in VSCode and enter the following command : <code> <b>npm i </b></code> </br></br>

Execution:</br>
To run the automation script use following command:</br></br>

<ul>
    <li>
        <code> <b>npx playwright test tests/login/login.spec.js --project chromium --headed</b></code> </br>
            This command will run the login test in headed mode for chromium browser.</br></br>
    </li>
</ul>

<ul>
    <li>
        <code> <b>npx playwright test tests/brand/brand.spec.js --project chromium --headed</b></code> </br>
            This command will run the brand test in headed mode for chromium browser.</br></br>
    </li>
</ul>

<ul>
    <li>
       <code> <b> npx playwright test </b></code></br>
            This command will execute all the tests availale in tests directory </br></br>
    </li>
</ul>

<ul>
    <li>
       <code> <b> npx playwright test --ui</b></code></br>
            This command will execute the tests availale in tests directory in UI view</br></br>
    </li>
</ul>

<ul>
    <li>
        <code> <b> npx playwright show-report </b></code></br>
            This command will open the latest test reoprt for the tests executed</br></br>
    </li>
</ul>
