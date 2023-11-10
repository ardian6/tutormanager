# capstone-project-3900f12apenguin

<!-- ABOUT THE PROJECT -->
## About The Project
The Tutor Connect Web Platform is a project aimed at creating a user-friendly online platform that connects students with tutors. This platform simplifies the process of finding and scheduling one-on-one tutoring appointments with private tutors. It provides students with a convenient way to browse and select tutors, view tutors' profiles and expertise, schedule tutorials, and communicate with tutors.

**Features:**
1. User Registration and Authentication
Users can create accounts and log in securely.
User roles: Students and Tutors.
2. Browse and Select Tutors
Students can search for tutors based on various criteria such as subject, location, availability, and expertise.
Detailed tutor profiles with information about qualifications, experience, and ratings.
3. Schedule Tutorials
Students can view tutor availability and schedule tutorial sessions at their convenience.
Calendar integration for easy scheduling.
4. Communication
Integrated messaging system to facilitate communication between students and tutors.
Notifications for upcoming tutorial sessions and messages.
5. Database (TALK ABOUT AWS)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

### Backend
[![Python][Python3]][Python3-url] <br />
[![Flask][Flask]][Flask-url] <br />
[![AWS][AWS]][AWS-url] <br />

### Frontend
[![JS][JS]][JS-url] <br />
[![CSS3][CSS3]][CSS3-url] <br />
[![HTML5][HTML5]][HTML5-url] <br />
[![NPM][NPM]][NPM-url] <br />
[![Yarn][Yarn]][Yarn-url] <br />
[![React][React.js]][React-url] <br />

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

This Project was created using WSL (Ubuntu 18.04) with Windows 10, hence the installation assumes the user uses those.

### Prerequisites
This installation assumes the user has a GitHub account with a valid SSH key.

* Connect to WSL and open a terminal.

* **Update any outdated packages or dependencies.**
   ```sh
   sudo apt update && upgrade
   ```

### Installation
**Do in order:**
> use 'pip3 freeze' to see if you've installed python modules correctly.
1. Clone the repo with SSH.
   ```sh
   git clone git@github.com:unsw-cse-comp3900-9900-23T3/capstone-project-3900f12apenguin.git
   ```
   ```sh
   cd capstone-project-3900f12apenguin
   ```
1. Install Python3.
   ```sh
   sudo apt install python3 python3-pip
   ```
6. Install Flask and Flask_Cors.
   ```sh
   pip3 install flask
   ```
   ```sh
   pip3 install flask_cors
   ```
7. Install psycopg2.
   ```sh
   sudo apt-get install build-dep python-psycopg2
   ```
   ```sh
   pip3 install psycopg2-binary
   ```
8. Install PyJWT.
   ```sh
   pip3 install PyJWT
   ```
2. Install Node.
   ```sh
   npm install
   ```
   ```sh
   sudo apt-get install -y nodejs
   ```
3. Install yarn.
   ```sh
   npm install --global yarn
   ```
4. Install React.
   ```sh
   yarn add react-scripts
   ```
5. Install Dependencies for Yarn. You should be at the directory path: /capstone-project-3900f12apenguin/src/frontend/my-app.
   ```sh
   yarn install
   ```
   ```sh
   yarn
   ```
4. Start the backend
   ```sh
   python3 src/backend/server.py
   ```
5. Start the frontend
   ```sh
   cd src/frontend/my-app
   ```
   **Install dependencies.**
   ```sh
   yarn install
   ```
   **Opens a new tab in your default browser.**
   ```sh
   yarn start
   ```
    
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/unsw-cse-comp3900-9900-23T3/capstone-project-3900f12apenguin.svg?style=for-the-badge
[license-url]: https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-3900f12apenguin/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[AWS-url]: https://aws.amazon.com/
[AWS]: https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white
[Python3]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[Python3-url]: https://www.python.org/
[Flask]: https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/
[NPM]: https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white
[NPM-url]: https://www.npmjs.com/
[Yarn-url]: https://classic.yarnpkg.com/lang/en/docs/
[Yarn]: https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white
[JS]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JS-url]: https://www.javascript.com/
[CSS3]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://www.w3.org/TR/CSS/#css
[HTML5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://html.spec.whatwg.org/

