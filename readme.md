# Boggle

## [**PLAY**](https://playboggle.netlify.com/)

Play-boggle is an online variant of a classic word game [Boggle](https://en.wikipedia.org/wiki/Boggle).

Developed using **React** and **Ruby on Rails**

Backend ROR API is used to generate a random boggle board and solve that particular board. Client React app uses that API endpoint to fetch a random boggle board and its solution.

[Yet Another Word List](https://coursera.cs.princeton.edu/algs4/assignments/boggle/files/dictionary-yawl.txt), comprehensive list of 264,061 English words is used as a Dictionary source.

Trie data structure and recursive depth first search algorithm is implemented to solve the given boggle board.

### About Game

- Boggle is a word game invented by Allan Turoff and originally distributed by Parker Borthers.
- Discover as many words as possible from a 4\*4 grid of randomly selected letters.
- A valid word can only be formed if each letter is contiguous (i.e. side-by-side, above or below, or on the diagonal) with the next, and no letter position can be used more than once in any given word.
- A valid word should have at least 3 letters.
- Score += 1 \* number of letters in the word.

### Deployements

Backend ROR app is hosted on AWS Lambda at [Boggle Function](https://3n6e02h3f2.execute-api.us-east-1.amazonaws.com/default/play-boggle)

Frontend React app is hosted on Netlify at [Play Boggle](https://playboggle.netlify.com/)

### Running Locally

- clone the repo
  `git clone https://github.com/99darshan/play-boggle.git`
- cd into boggle_api directory
  `cd boggle_api`
- run rails server
  `rails s`
- cd into client directory
  `cd client`
- run client app with npm
  `npm start`

**NOTE:**

Client app is configured to fetch board from the AWS Lambda Function. To Configure it to fetch boggle board from the locally running ROR app replace **BOGGLE_ENDPOINT** property in `client/src/constants` file to the localhost URL serving the rails app.

Example: `export const BOGGLE_ENDPOINT = "http://localhost:3000/boggle";`

I know I should've used dotenv and made the URL configurable based on the curent environment, but I opted to be lazy instead so 🤦‍♀️

### Screenshots

![Home](https://boggle-dict.s3.amazonaws.com/Screen+Shot+2020-03-03+at+9.14.20+PM.png)

![Board](https://boggle-dict.s3.amazonaws.com/Screen+Shot+2020-03-03+at+9.15.48+PM.png)

![Board_Correct_Input](https://boggle-dict.s3.amazonaws.com/Screen+Shot+2020-03-03+at+9.18.50+PM.png)

![Game End](https://boggle-dict.s3.amazonaws.com/Screen+Shot+2020-03-03+at+9.21.40+PM.png)

Made with 💜 ☕ !💤 by [@99darshan]('https://www.linkedin.com/in/99darshan/')
