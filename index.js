import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const PORT = process.env.PORT || 3001;

const JWT_SECRET = "sdjhgcbdshgcsfhdfsdsdsdssdcrrf454dfjgdhfg4dfdhk";

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log("no connection"));

const userSchema = new mongoose.Schema(
  {
    name: String,
    number: Number,
    password: String,
    UserType: String,
    Balance: Number,
    AccountHolder: String,
    BankName: String,
    ifscCode: String,
    AccountNumber: Number,
    WithdrawAmount: Number,
    StatusWithdraw: Boolean,
    ApprovedAmount: Boolean,
    invited: String,
    InviteCode: String,
    invitePromo: Boolean,
  },
  {
    timestamps: true,
  }
);

const activeSchema = new mongoose.Schema(
  {
    amounts: Number,
    selectNum: Number,
    userId: String,
    name: String,
    contact: String,
  },
  {
    timestamps: true,
  }
);

const colorSchema = new mongoose.Schema(
  {
    totalmoneys: Number,
    userId: String,
    agrees: Boolean,
    colors: String,
    usernumber: Number,
    userAid: String,
    username: String,
    entryTime: String,
  },
  {
    timestamps: true,
  }
);

const coloredSchema = new mongoose.Schema(
  {
    totalmoneys: Number,
    userId: String,
    agrees: Boolean,
    colors: String,
    usernumber: Number,
    userAid: String,
    username: String,
    currentPer: String,
    WinningFlag: Boolean,
    entryTime: String,
  },
  {
    timestamps: true,
  }
);

const colornumberSchema = new mongoose.Schema(
  {
    totalmoneytwo: Number,
    numberstwo: Number,
    agreestwo: Boolean,
    colorstwo: String,
    usernumbertwo: Number,
    userAidtwo: String,
    usernametwo: String,
  },
  {
    timestamps: true,
  }
);

const colornumberedSchema = new mongoose.Schema(
  {
    totalmoneytwo: Number,
    numberstwo: Number,
    agreestwo: Boolean,
    colorstwo: String,
    usernumbertwo: Number,
    userAidtwo: String,
    usernametwo: String,
    currentPer: String,
    WinningFlag: Boolean,
  },
  {
    timestamps: true,
  }
);

const paymentSchema = new mongoose.Schema(
  {
    paymentamount: Number,
    paymentutr: Number,
    payflags: Boolean,
    approvedpaymentamount: Boolean,
    numbers: Number,
    userId: String,
    invitationflag: String,
  },
  {
    timestamps: true,
  }
);

const sizeSchema = new mongoose.Schema(
  {
    totalmoneythree: Number,
    sizethree: String,
    agreesthree: String,
    colorsthree: String,
    usernumberthree: Number,
    userAidthree: String,
    usernamethree: String,
  },
  {
    timestamps: true,
  }
);

const sizedSchema = new mongoose.Schema(
  {
    totalmoneythree: Number,
    sizethree: String,
    agreesthree: String,
    colorsthree: String,
    usernumberthree: Number,
    userAidthree: String,
    usernamethree: String,
    WinningFlag: Boolean,
    currentPer: String,
  },
  {
    timestamps: true,
  }
);

const withdrawrecordSchema = new mongoose.Schema(
  {
    withdrawamount: Number,
    userId: String,
    flags: Boolean,
  },
  {
    timestamps: true,
  }
);

const rechargerecordSchema = new mongoose.Schema(
  {
    walls: Number,
    uniqueId: String,
  },
  {
    timestamps: true,
  }
);

const dateSchema = new mongoose.Schema(
  {
    dated: Date,
  },
  {
    timestamps: true,
  }
);

const champSchema = new mongoose.Schema(
  {
    periodchamp: String,
    colorchamp: String,
    numberchamp: Number,
    bigchamp: String,
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("User", userSchema);

const ActiveUser = new mongoose.model("ActiveUser", activeSchema);

const ColorUser = new mongoose.model("ColorUser", colorSchema);

const ColoredUser = new mongoose.model("ColoredUser", coloredSchema);

const ColorNumberUser = new mongoose.model(
  "ColorNumberUser",
  colornumberSchema
);

const ColorNumberedUser = new mongoose.model(
  "ColorNumberedUser",
  colornumberedSchema
);

const SizeUser = new mongoose.model("SizeUser", sizeSchema);

const SizedUser = new mongoose.model("SizedUser", sizedSchema);

const DateUser = new mongoose.model("DateUser", dateSchema);

const WithdrawRecordUser = new mongoose.model(
  "WithdrawRecordUser",
  withdrawrecordSchema
);

const RechargeRecordUser = new mongoose.model(
  "RechargeRecordUser",
  rechargerecordSchema
);

const ChampUser = new mongoose.model("ChampUser", champSchema);

const PaymentUser = new mongoose.model("PaymentUser", paymentSchema);

app.post("/useractive", (req, res) => {
  const { amounts, selectNum, userId, name, contact } = req.body;
  ActiveUser.find({}).then((activeuser) => {
    activeuser = new ActiveUser({
      amounts,
      selectNum,
      userId,
      name,
      contact,
    });
    activeuser.save(res.send({ message: "Your Number Selected Successfully" }));
  });
});

let currentTime = new Date();
let counter = 1;

async function task1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      ColorNumberUser.aggregate([
        {
          $group: {
            _id: "$numberstwo",
            totalAmount: { $sum: "$totalmoneytwo" },
          },
        },
        {
          $sort: { totalAmount: 1 },
        },
      ]).then((winner) => {
        const existingNumbers = winner;
        const result = [];

        for (let i = 0; i <= 9; i++) {
          const existingNumber = existingNumbers.find((obj) => obj._id === i);
          if (!existingNumber) {
            result.push({ _id: i, totalAmount: 0 });
          } else {
            result.push(existingNumber);
          }
        }
        console.log(result);

        let minTotalAmount = Infinity;
        let minId = null;

        result.forEach((item) => {
          if (
            item.totalAmount < minTotalAmount ||
            (item.totalAmount === minTotalAmount && item._id < minId)
          ) {
            minTotalAmount = item.totalAmount;
            minId = item._id;
          }
        });
        ColorNumberUser.find({ selectNum: minId }).then((allwinner) => {
          const winnerdata1 = {
            selected: minId,
            WinningAmount: minTotalAmount,
            allwinner: allwinner,
          };
          ColorUser.aggregate([
            {
              $group: {
                _id: "$colors",
                totalAmount: { $sum: "$totalmoneys" },
              },
            },
            {
              $sort: { totalAmount: 1 },
            },
          ]).then((winner) => {
            console.log(winner);
            const existingNumbers = winner;
            const result = [];
            const colorArray = ["green", "violet", "red"];
            for (let i = 0; i <= colorArray.length - 1; i++) {
              const existingNumber = existingNumbers.find(
                (obj) => obj._id === colorArray[i]
              );
              if (!existingNumber) {
                result.push({ _id: colorArray[i], totalAmount: 0 });
              } else {
                result.push(existingNumber);
              }
            }
            console.log(result);

            let minTotalAmount = Infinity;
            let minId = null;

            result.forEach((item) => {
              if (
                item.totalAmount < minTotalAmount ||
                (item.totalAmount === minTotalAmount && item._id < minId)
              ) {
                minTotalAmount = item.totalAmount;
                minId = item._id;
              }
            });
            ColorUser.find({ selectNum: minId }).then((allwinner) => {
              const winnerdata2 = {
                selected: minId,
                WinningAmount: minTotalAmount,
                allwinner: allwinner,
              };

              SizeUser.aggregate([
                {
                  $group: {
                    _id: "$sizethree",
                    totalAmount: { $sum: "$totalmoneythree" },
                  },
                },
                {
                  $sort: { totalAmount: 1 },
                },
              ]).then((winner) => {
                console.log(winner);
                const existingNumbers = winner;
                const result = [];
                const colorArray = ["small", "big"];
                for (let i = 0; i <= colorArray.length - 1; i++) {
                  const existingNumber = existingNumbers.find(
                    (obj) => obj._id === colorArray[i]
                  );
                  if (!existingNumber) {
                    result.push({ _id: colorArray[i], totalAmount: 0 });
                  } else {
                    result.push(existingNumber);
                  }
                }
                console.log(result);

                let minTotalAmount = Infinity;
                let minId = null;

                result.forEach((item) => {
                  if (
                    item.totalAmount < minTotalAmount ||
                    (item.totalAmount === minTotalAmount && item._id < minId)
                  ) {
                    minTotalAmount = item.totalAmount;
                    minId = item._id;
                  }
                });
                SizeUser.find({ selectNum: minId }).then((allwinner) => {
                  const winnerdata3 = {
                    selected: minId,
                    WinningAmount: minTotalAmount,
                    allwinner: allwinner,
                  };
                  console.log(
                    "allwinners",
                    winnerdata1,
                    winnerdata2,
                    winnerdata3
                  );
                  const year = currentTime.getFullYear().toString();
                  const month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
                  const day = ("0" + currentTime.getDate()).slice(-2);
                  const convertedDate = year + month + day;

                  SizeUser.find({ sizethree: winnerdata3.selected }).then(
                    (sizeId) => {
                      for (const obj of sizeId) {
                        const { userAidthree, totalmoneythree } = obj;

                        User.find({ _id: userAidthree }).then((getuser) => {
                          if (getuser) {
                            getuser.map((item) => {
                              User.updateOne(
                                { _id: item._id },
                                {
                                  $set: {
                                    Balance: item.Balance + totalmoneythree * 2,
                                  },
                                }
                              ).then((user) => {
                                console.log("updated");
                              });
                            });
                          } else {
                            console.error(
                              `User not found for userAidthree: ${userAidthree}`
                            );
                          }
                        });
                      }
                    }
                  );
                  ColorUser.find({ colors: winnerdata2.selected }).then(
                    (colorId) => {
                      for (const obj of colorId) {
                        const { userAid, totalmoneys } = obj;

                        User.find({ _id: userAid }).then((getcoloruser) => {
                          if (getcoloruser) {
                            getcoloruser.map((item) => {
                              User.updateOne(
                                { _id: item._id },
                                {
                                  $set: {
                                    Balance: item.Balance + totalmoneys * 2,
                                  },
                                }
                              ).then((user) => {
                                console.log("updated");
                              });
                            });
                          } else {
                            console.error(
                              `User not found for userAidthree: ${userAid}`
                            );
                          }
                        });
                      }
                    }
                  );

                  ColorNumberUser.find({ colors: winnerdata1.selected }).then(
                    (colornumberId) => {
                      for (const obj of colornumberId) {
                        const { userAidtwo, totalmoneytwo } = obj;
                          User.find({ _id: userAidtwo }).then(
                          (getcolornumberuser) => {
                            if (getcolornumberuser) {
                              getcolornumberuser.map((item) => {
                                User.updateOne(
                                  { _id: item._id },
                                  {
                                    $set: {
                                      Balance: item.Balance + totalmoneytwo * 2,
                                    },
                                  }
                                ).then((user) => {
                                  console.log("updated");
                                });
                              });
                            } else {
                              console.error(
                                `User not found for userAidthree: ${userAidtwo}`
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                 
                  if(winnerdata1.WinningAmount === 0 || winnerdata2.WinningAmount === 0 || winnerdata3.WinningAmount === 0){
                    console.log(winnerdata1.WinningAmount === 0)
                    let colorz = ["red","violet","green"];
                    let selectedColor;
                    let randomIndex = Math.floor(Math.random()*colorz.length);
                    selectedColor = colorz[randomIndex];
                    let numberz = [0,1,2,3,4,5,6,7,8,9];
                    let selectedNumber;
                    let randomIndexnum = Math.floor(Math.random()*numberz.length);
                    selectedNumber = numberz[randomIndexnum];
                    let bigz = ["small","big"];
                    let selectedNow;
                    let randomIndexbig = Math.floor(Math.random()*bigz.length);
                    selectedNow = bigz[randomIndexbig];

                  ChampUser.find({}).then((champuser) => {
                    champuser = new ChampUser({
                      periodchamp: `${convertedDate}` + counter,
                      colorchamp: winnerdata2.WinningAmount===0 ? selectedColor : winnerdata2.selected,
                      numberchamp: winnerdata1.WinningAmount===0 ? selectedNumber : winnerdata1.selected,
                      bigchamp: winnerdata3.WinningAmount===0 ? selectedNow : winnerdata3.selected,
                    });
                    champuser.save();
                  });
                  }
               
                });
              });
            });
          });
        });
      });

      resolve();
    }, 2000);
  });
}

async function task2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      ColorNumberUser.deleteMany({}).then((res) => {});
      ColorUser.deleteMany({}).then((res) => {});
      SizeUser.deleteMany({}).then((res) => {});
      resolve();
    }, 3000);
  });
}

async function task3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      counter++;
      currentTime = new Date();
      resolve();
    }, 1000);
  });
}

async function scheduleFunction() {
  setInterval(async () => {
    console.log("Executing function...");
    await task1();
    await task2();
    await task3();
  }, 3 * 60 * 1000);
}
scheduleFunction();

app.get("/timertime", (req, res) => {
  const year = currentTime.getFullYear().toString();
  const month = ("0" + (currentTime.getMonth() + 1)).slice(-2); // Months are 0-based
  const day = ("0" + currentTime.getDate()).slice(-2);
  const convertedDate = year + month + day;
  let currenttimedata = {
    currentTime: currentTime,
    counter: `${convertedDate}` + counter,
  };
  res.send({ message: "color data fetched", currenttimedata });
});

app.get("/perioduserlist", (req, res) => {
  ChampUser.find({}).then((champuser) => {
    res.send({ message: "period data fetched", champuser: champuser });
  
    ChampUser.find({}).then((allcham) => {
      const allchampcolor = allcham.map((item) => item.colorchamp);
      const allchampperiod = allcham.map((item) => item.periodchamp);
      ColoredUser.updateOne(
        { colors: allchampcolor, currentPer: allchampperiod },
        { $set: { WinningFlag: true } }
      ).then((hellos) => console.log("updated", hellos));
    })
 

    ChampUser.find({}).then((allcham)=>{
      const allchampnumber = allcham.map((item)=>item.numberchamp);
      const allchampperiod = allcham.map((item)=>item.periodchamp);
      ColorNumberedUser.updateOne(
        { numberstwo: allchampnumber,
          currentPer:allchampperiod
        },
        { $set: { WinningFlag: true } }
      ).then(() => console.log("updated"));
    })

    ChampUser.find({}).then((allcham)=>{
      const allchampsize = allcham.map((item)=>item.bigchamp);
      const allchampperiod = allcham.map((item)=>item.periodchamp);
      SizedUser.updateOne(
        { sizethree: allchampsize,
          currentPer:allchampperiod
        },
        { $set: { WinningFlag: true } }
      ).then(() => console.log("updated"));
    })
});
});


app.post("/usercolor", (req, res) => {
  const {
    totalmoneys,
    userId,
    agrees,
    colors,
    usernumber,
    userAid,
    username,
    currentPer,
    entryTime,
  } = req.body;

  const entryTimeLimit = 3 * 60 * 1000;
  console.log(entryTimeLimit);
  console.log(entryTime - currentTime);
  if (entryTime - currentTime.getTime() > entryTimeLimit) {
    res.send({ message: "Period Settled" });
  } else {
    ColorUser.find({}).then((coloruser) => {
      coloruser = new ColorUser({
        totalmoneys,
        userId,
        agrees,
        colors,
        usernumber,
        userAid,
        username,
        entryTime,
      });
      coloruser.save(
        res.send({
          message: "Your color selected successfully",
          timeperiod: currentTime,
        })
      );
    });
    ColoredUser.find({}).then((coloreduser) => {
      coloreduser = new ColoredUser({
        totalmoneys,
        userId,
        agrees,
        colors,
        usernumber,
        userAid,
        username,
        currentPer,
        WinningFlag: false,
        entryTime,
      });
      coloreduser.save();
    });
  }
});

app.post("/usernumbercolor", (req, res) => {
  const {
    totalmoneytwo,
    numberstwo,
    agreestwo,
    colorstwo,
    usernumbertwo,
    userAidtwo,
    usernametwo,
    currentPer,
    entryTime,
  } = req.body;
  const entryTimeLimit = 3 * 60 * 1000;
  console.log(entryTimeLimit);
  console.log(entryTime - currentTime);
  if (entryTime - currentTime.getTime() > entryTimeLimit) {
    res.send({ message: "Period Settled" });
  } else {
    ColorNumberUser.find({}).then((colornumberuser) => {
      colornumberuser = new ColorNumberUser({
        totalmoneytwo,
        numberstwo,
        agreestwo,
        colorstwo,
        usernumbertwo,
        userAidtwo,
        usernametwo,
      });
      colornumberuser.save(
        res.send({ message: "Your number selected successfully" })
      );
    });
    ColorNumberedUser.find({}).then((colornumbereduser) => {
      colornumbereduser = new ColorNumberedUser({
        totalmoneytwo,
        numberstwo,
        agreestwo,
        colorstwo,
        usernumbertwo,
        userAidtwo,
        usernametwo,
        currentPer,
        WinningFlag: false,
      });
      colornumbereduser.save();
    });
  }
});

app.post("/usernumbersize", (req, res) => {
  const {
    totalmoneythree,
    sizethree,
    agreesthree,
    colorsthree,
    usernumberthree,
    userAidthree,
    usernamethree,
    currentPer,
    entryTime,
  } = req.body;
  const entryTimeLimit = 3 * 60 * 1000;
  console.log(entryTimeLimit);
  console.log(entryTime - currentTime);
  if (entryTime - currentTime.getTime() > entryTimeLimit) {
    res.send({ message: "Period Settled" });
  } else {
    SizeUser.find({}).then((sizeuser) => {
      sizeuser = new SizeUser({
        totalmoneythree,
        sizethree,
        agreesthree,
        colorsthree,
        usernumberthree,
        userAidthree,
        usernamethree,
      });
      sizeuser.save(res.send({ message: "Your color size successfully" }));
    });
    SizedUser.find({}).then((sizeduser) => {
      sizeduser = new SizedUser({
        totalmoneythree,
        sizethree,
        agreesthree,
        colorsthree,
        usernumberthree,
        userAidthree,
        usernamethree,
        currentPer,
        WinningFlag: false,
      });
      sizeduser.save();
    });
  }
});

app.post("/login", (req, res) => {
  const { number, password } = req.body;
  User.findOne({ number: number }).then((user) => {
    if (user) {
      if (password === user.password) {
        const token = jwt.sign({ number: user.number }, JWT_SECRET);
        if (res.status(201)) {
          return res.send({
            status: "ok",
            message: "Login Successfully",
            token: token,
            user: user,
          });
        } else {
          return res.send({ error: "error" });
        }
      } else {
        res.send({ message: "Password Incorrect" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const {
    name,
    number,
    password,
    UserType,
    Balance,
    AccountHolder,
    BankName,
    ifscCode,
    AccountNumber,
    WithdrawAmount,
    StatusWithdraw,
    ApprovedAmount,
    invited,
    invitePromo,
  } = req.body;
  User.findOne({ number: number }).then((user) => {
    if (user) {
      res.send({ message: "User already registered" });
    } else {
      User.find({ InviteCode: invited }).then((regist) => {
        const invitedata = regist.map((item) => item.InviteCode);
        if (invitedata.toString() === invited) {
          const randomCode = crypto
            .randomBytes(3)
            .toString("hex")
            .toUpperCase();
          const user = new User({
            name,
            number,
            password,
            UserType,
            Balance,
            AccountHolder,
            BankName,
            ifscCode,
            AccountNumber,
            WithdrawAmount,
            StatusWithdraw,
            ApprovedAmount,
            invited,
            InviteCode: randomCode,
            invitePromo,
          });
          user.save(
            res.send({ message: "Registered Successfully, Please Login now" })
          );
        } else {
          res.send({ message: "Referal code not valid" });
        }
      });
    }
  });
});

app.get("/userlist", (req, res) => {
  User.find({}).then((user) => {
    res.send({ message: "user data fetched", user: user });
  });
});

app.get("/numberlist", (req, res) => {
  ActiveUser.find({}).then((activeuser) => {
    res.send({ message: "user data fetched", activeuser: activeuser });
  });
});

app.get("/colorlist", (req, res) => {
  ColorUser.find({}).then((coloruser) => {
    res.send({ message: "color data fetched", coloruser: coloruser });
  });
});

app.get("/usernumbercolor", (req, res) => {
  ColorNumberUser.find({}).then((colornumberuser) => {
    res.send({
      message: "color data fetched",
      colornumberuser: colornumberuser,
    });
  });
});

app.get("/periodwinlist", (req, res) => {
  ColoredUser.find({}).then((coloreduser) => {
    ColorNumberedUser.find({}).then((colornumbereduser) => {
      SizedUser.find({}).then((sizeduser) => {
        const allperiodwin = {
          coloreduser: coloreduser,
          colornumbereduser: colornumbereduser,
          sizeduser: sizeduser,
        };
        res.send({ message: "all data fetched", allperiodwin: allperiodwin });
      });
    });
  });
});

app.get("/usernumbersize", (req, res) => {
  SizeUser.find({}).then((sizeuser) => {
    res.send({ message: " data fetched", sizeuser: sizeuser });
  });
});

app.get("/totalamount", (req, res) => {
  ActiveUser.aggregate([
    { $group: { _id: null, salary_sum: { $sum: "$amounts" } } },
  ]).then((active) => {
    const resulted = active;
    if (resulted.length === 0) {
      res.send({ message: "user data fetched", active: 0 });
    } else {
      res.send({
        message: "user data fetched",
        active: resulted[0].salary_sum,
      });
    }
  });
});

app.get("/occurnum", (req, res) => {
  ActiveUser.aggregate([
    {
      $group: {
        _id: "$selectNum",
        totalAmount: { $sum: "$amounts" },
      },
    },
    {
      $sort: { totalAmount: 1 },
    },
  ]).then((winner) => {
    const existingNumbers = winner;
    const result = [];

    for (let i = 1; i <= 100; i++) {
      const existingNumber = existingNumbers.find((obj) => obj._id === i);
      if (!existingNumber) {
        result.push({ _id: i, totalAmount: 0 });
      } else {
        result.push(existingNumber);
      }
    }

    let minTotalAmount = Infinity;
    let minId = null;

    result.forEach((item) => {
      if (
        item.totalAmount < minTotalAmount ||
        (item.totalAmount === minTotalAmount && item._id < minId)
      ) {
        minTotalAmount = item.totalAmount;
        minId = item._id;
      }
    });
    ActiveUser.find({ selectNum: minId }).then((allwinner) => {
      const winnerdata = {
        selected: minId,
        WinningAmount: minTotalAmount,
        allwinner: allwinner,
      };
      res.send({ message: "Winner List fetched", winner: winnerdata });
    });
  });
});

app.post("/dateannounce", (req, res) => {
  const { dated } = req.body;
  const dateuser = new DateUser({
    dated,
  });
  dateuser.save(res.send({ message: "Announcement added" }));
});

app.get("/dateannouncecalled", (req, res) => {
  DateUser.find()
    .sort({ _id: -1 })
    .limit(1)
    .then((dateuser) => {
      res.send({ message: "Announcement data fetched", dateuser: dateuser });
    });
});

app.post("/updatebalance", (req, res) => {
  const { walls, uniqueId, wallet } = req.body;
  User.updateOne({ _id: uniqueId }, { $set: { Balance: walls + wallet } }).then(
    (user) => {}
  );
  RechargeRecordUser.find({}).then((rechargeuser) => {
    rechargeuser = new RechargeRecordUser({
      uniqueId,
      walls,
    });
    rechargeuser.save();
  });
});

app.post("/updatebalancewallet", (req, res) => {
  const { userId, amounts } = req.body;
  User.find({ _id: userId }).then((act) => {
    const wal = act.map((ite) => ite.Balance);
    User.updateOne(
      { _id: userId },
      { $set: { Balance: wal.toString() - amounts } }
    ).then((user) => {
      console.log("updated");
    });
  });
});

app.post("/updatetransfer", (req, res) => {
  const { mobiles, tranAmount } = req.body;
  const transAmount = parseInt(tranAmount);
  User.find({ number: mobiles }).then((act) => {
    const walls = act.map((ite) => ite.Balance);
    const newWalls = walls.toString();
    const newValueAmount = parseInt(newWalls);
    User.updateOne(
      { number: mobiles },
      { $set: { Balance: newValueAmount + transAmount } }
    ).then((user) => {
      console.log("updated");
    });
  });
});

app.post("/updatetransferreceiver", (req, res) => {
  const { tranAmount, transferId } = req.body;
  User.find({ _id: transferId }).then((act) => {
    const walz = act.map((ite) => ite.Balance);
    User.updateOne(
      { _id: transferId },
      { $set: { Balance: walz.toString() - tranAmount } }
    ).then((user) => {
      console.log("updated");
    });
  });
});

app.post("/finaltransfer", (req, res) => {
  const { numberGet } = req.body;
  ActiveUser.aggregate([
    {
      $match: {
        selectNum: numberGet,
      },
    },
    {
      $group: {
        _id: "$userId",
        totalAmount: { $sum: "$amounts" },
      },
    },
  ]).then((acti) => {
    console.log(acti);
    acti.forEach(async (item) => {
      const userId = item._id;
      const totalAmount = item.totalAmount * 100;

      const user = await User.findOne({ _id: userId });

      if (user) {
        user.Balance += totalAmount;
        await User.updateOne(
          { _id: userId },
          { $set: { Balance: user.Balance } }
        );
        console.log(
          `Updated balance for user ${userId} to ${user.Balance} and ${user.name}`
        );
      } else {
        console.log(`User ${userId} not found`);
      }
    });
  });
});

app.post("/updatebankdetails", (req, res) => {
  const {
    userId,
    holder,
    bankname,
    ifsc,
    accountnumber,
    WithdrawAmount,
    StatusWithdraw,
    ApprovedAmount,
  } = req.body;
  User.updateOne(
    { _id: userId },
    {
      AccountHolder: holder,
      BankName: bankname,
      ifscCode: ifsc,
      AccountNumber: accountnumber,
      WithdrawAmount: WithdrawAmount,
      StatusWithdraw: StatusWithdraw,
      ApprovedAmount: ApprovedAmount,
    }
  ).then((user) => {});
});

app.post("/withdrawalrequest", (req, res) => {
  const {
    numbers,
    withdrawpassword,
    withdrawamount,
    flags,
    approvedamount,
    userId,
  } = req.body;
  User.findOne({ number: numbers }).then((user) => {
    console.log(user.StatusWithdraw);
    if (user) {
      if (withdrawpassword === user.password) {
        if (user.StatusWithdraw !== true) {
          WithdrawRecordUser.find({}).then((withdrawuser) => {
            withdrawuser = new WithdrawRecordUser({
              userId,
              withdrawamount,
              flags,
            });
            withdrawuser.save();
          });
          User.updateOne(
            { _id: userId },
            {
              WithdrawAmount: withdrawamount,
              StatusWithdraw: flags,
              ApprovedAmount: approvedamount,
            }
          ).then((user) => {
            res.send({ message: "Withrawal Requested Please wait....." });
          });
        } else {
          res.send({ message: "You have already requested for withdrawal" });
        }
      } else {
        res.send({ message: "Password Incorrect" });
      }
    }
  });
});

app.post("/rechargerequest", (req, res) => {
  const {
    paymentamount,
    paymentutr,
    payflags,
    approvedpaymentamount,
    numbers,
    userId,
    invitationflag,
  } = req.body;
  const paymentuser = new PaymentUser({
    paymentamount,
    paymentutr,
    payflags,
    approvedpaymentamount,
    numbers,
    userId,
    invitationflag,
  });
  paymentuser.save(res.send({ message: "Recharge Requested" }));
});

app.get("/payments", (req, res) => {
  PaymentUser.find({}).then((payments) => {
    res.send({ message: "Recharge fetched", payments: payments });
  });
});

app.get("/withdraws", (req, res) => {
  WithdrawRecordUser.find({}).then((withdrawnow) => {
    res.send({ message: "withdrawn fetched", withdrawnow: withdrawnow });
  });
});

app.get("/recharges", (req, res) => {
  RechargeRecordUser.find({}).then((rechargenow) => {
    res.send({ message: "recharge fetched", rechargenow: rechargenow });
  });
});

app.post("/deleteactiveuser", (req, res) => {
  ActiveUser.deleteMany({}).then((res) => {
    console.log("deleted");
  });
});

app.post("/approvedrequest", (req, res) => {
  const { approvedId } = req.body;
  console.log(approvedId);
  User.find({ _id: approvedId }).then((act) => {
    const walz = act.map((ite) => ite.WithdrawAmount);
    const walzWithdraw = walz.toString();
    const walzBalance = act.map((ite) => ite.Balance);
    if (walzWithdraw != 0) {
      WithdrawRecordUser.updateMany(
        { userId: approvedId },
        { $set: { flags: false } }
      ).then(() => console.log("updated", approvedId));

      // WithdrawRecordUser.updateOne(
      //   { userId: approvedId },
      //      {
      //        $set: {
      //                 flags: false,
      //               },
      //      }

      //     ).then(()=>console.log("updated"));
      User.updateOne(
        { _id: approvedId },
        {
          $set: {
            Balance: walzBalance.toString() - walzWithdraw,
            WithdrawAmount: 0,
            StatusWithdraw: false,
            ApprovedAmount: true,
          },
        }
      ).then((user) => {
        res.send({ message: "Withdraw approved" });
      });
    } else {
      res.send({ message: "Not requested" });
    }
  });
});

app.post("/paymentsrequest", (req, res) => {
  const { userId, approvedAmount } = req.body;
  User.find({ _id: userId }).then((actpromo) => {
    const promoAll = actpromo.map((item) => item.invited);
    const promoAllBool = actpromo.map((item) => item.invitePromo);
    const promoAllOne = promoAll[0];
    const promoAllBoolTwo = promoAllBool[0];

    if (promoAllBoolTwo === true && approvedAmount >= 500) {
      console.log("trigger");
      User.updateOne(
        {
          InviteCode: promoAllOne,
        },
        {
          $inc: { Balance: 120 },
        }
      ).then((hello) => console.log(hello));

      User.updateOne({ _id: userId }, { $set: { invitePromo: false } }).then(
        (hellows) => console.log(hellows)
      );
    }
  });

  User.find({ _id: userId }).then((act) => {
    const walzBalance = act.map((ite) => ite.Balance);
    User.updateOne(
      { _id: userId },
      {
        $set: {
          Balance: parseInt(walzBalance.toString()) + approvedAmount,
        },
      }
    ).then((user) => {
      res.send({ message: "recharge done" });
    });
    PaymentUser.deleteOne({ userId: userId }).then((deleted) => {});
  });
});

app.post("/confirmpassword", (req, res) => {
  const { old, confirmpassword, userId, newpassword } = req.body;
  User.findOne({ password: old }).then((con) => {
    if (con) {
      if (confirmpassword === newpassword) {
        User.updateOne(
          { _id: userId },
          { $set: { password: confirmpassword } }
        ).then((user) => {
          res.send({ message: "Password Successfully changed" });
        });
      } else {
        res.send({ message: "confirm and new password is not same" });
      }
    } else {
      res.send({ message: "password does not exist" });
    }
  });
});

app.listen(PORT, () => {
  console.log("BE started at port 3002");
});
