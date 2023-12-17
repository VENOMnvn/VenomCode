const Problems = require("./../MongoDB/QuestionSchema");

const CreateProblem = async (req, res) => {
  try {
    console.log(req.body);
    const { label, title, user, link, description } = req.body;

    function generatePassword(length) {
      (charset =
        "ABCDEFGHIJKLMNOPQRSTUV0123456789"),
        (retVal = "");
      for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      return retVal;
    }

    const id = generatePassword(7);
    const responseByDB = await Problems.create({
      tags: label,
      title,
      user,
      link,
      description,
      id
    });

    res.send({
      success: true,
      question: responseByDB,
    });
  } catch (err) {
    console.log(err);
    res.send({
      err: "Cant Create",
    });
  }
};

const getProblem = async (req, res) => {
  try {
    console.log(req.query);
    const {id} = req.query;
    const problem = await Problems.findById(id).populate('solutions');
    res.send({
      success:true,
      problem
    });

  } catch (err) {
    console.log(err);
  }
};

const getProblems = async (req, res) => {
  try{
    const {limit,skip} = req.query;
    console.log(req.query);
    const problems = await Problems.find().limit(limit).skip(skip*limit).populate('solutions').sort({createdAt:-1});
    res.send({
        success:true,
        problems
    });
  }catch (err) {
    console.log(err);
  }
};

const getUserProblems = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

const getProblemswithTag = async (req, res) => {
  try {
    const {Tags} = req.body;
    console.log(Tags);
    const problems = await Problems.find({tags:{$in:Tags}});
    console.log(problems);
    res.send({
      success:true,
      problems
    })
  } catch (err) {
    console.log(err);
  }
};

const getProblemsCount = async (req, res) => {
  try {
    const count = await Problems.count();
    res.send({count});
  } catch (err) {
    console.log(err);
  }
};



module.exports = { getProblem, getProblems, getUserProblems, CreateProblem,getProblemsCount,getProblemswithTag};
