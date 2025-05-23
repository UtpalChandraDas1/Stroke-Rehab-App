let score = 0;
let errors = 0;
let MosquitoCount = 0;
let gameInterval;
let spawnInterval;
let gameTimerInterval;
let startTime;
let MosquitoSpeed = 2000; // Default speed in milliseconds
let MosquitoNumber = 5; // Default number of Mosquitos
let gameTime = 0;

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("stopButton").addEventListener("click", stopGame);

function startGame() {
    MosquitoNumber = parseInt(document.getElementById("MosquitoNumber").value) || 5;
    MosquitoSpeed = parseInt(document.getElementById("MosquitoSpeed").value) || 2000;
    resetGame();
    document.getElementById("startButton").style.display = "none";
    document.getElementById("stopButton").style.display = "inline";

    for (let i = 0; i < MosquitoNumber; i++) {
        spawnMosquitos();
    }
    gameInterval = setInterval(spawnMosquitos, MosquitoSpeed); // Controls Mosquito spawning frequency
    gameTimerInterval = setInterval(updateTimer, 1000); // Timer updates every second
}

function resetGame() {
    score = 0;
    errors = 0;
    MosquitoCount = 0;
    gameTime = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("reactionTime").innerText = 0;
    document.getElementById("errors").innerText = errors;
    document.getElementById("MosquitoCount").innerText = MosquitoCount;
    document.getElementById("gameTimer").innerText = gameTime;
    clearInterval(gameInterval);
    clearInterval(spawnInterval);
    clearInterval(gameTimerInterval);
    document.getElementById("gameArea").innerHTML = "";
}

function spawnMosquitos() {
    const gameArea = document.getElementById("gameArea");
    const Mosquito = document.createElement("div");
    Mosquito.className = "Mosquito";
    Mosquito.style.top = `${Math.random() * (gameArea.offsetHeight - 10)}px`;
    Mosquito.style.left = `${Math.random() * (gameArea.offsetWidth - 10)}px`;

    // Add updated Mosquito image
    const MosquitoImage = document.createElement("img");
    MosquitoImage.src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUREhIWFRUWGBoYExYYGRoVGBcXFxcXFxUbGxsZICojGB8lIxgfIzEhJSsrLi4xFyAzODMtNygtLisBCgoKDg0OGhAQGi8mICAtKy4vLTgtLS0vNy8tLSstKy03Li0tLysrLS0tMCstLS0tLS0tKysvLS8uLSsrLS0tMv/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAADBAUGAAIHAQj/xABGEAABAgMFBAkCAwUGBQUBAAABAgMABBEFEiExUQYTQWEUIjJxgZGhscEH8CNCUhVicoLhJDNDktHxU2ODorIXNEWTwwj/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAMBEBAAICAAQEAwYHAAAAAAAAAAECAxEEEiExIkFRYQUTcTKhscHh8BQVI0KBkfH/2gAMAwEAAhEDEQA/AOxR6jMd494y4dD5GPUpNRgcxwgHYHMdk+HvG28Go84G8oEUBqeWPGAWgstn4fIgdw6HyMEYwOOGHHCAahea4ePxBt4NR5wCYNaUxzyx0gAwzK5Hv+BC9w6HyMHl1UBrhjxwgDwm/wBo/fCGt4NR5ws6KkkYjljwgBw61kO4QncOh8jDTaxQYjKAJEeId3g1HnCgQdD5GAxGY7x7w9CSUmowOY4Q3vBqPOA1mOyfD3hSGXlAigNTyx4wvcOh8jAEls/D5ENQqxgccMOOEMbwajzgAzXDx+IBBpg1pTHPLHSBXDofIwDErke/4EGgEuqgNcMeOEF3g1HnAKv9o/fCNII6KkkYjljwjS4dD5GA8jI9uHQ+Rj2AdjV3snuMa79OvoY1W6CCAcTgIBaN2O0PvhGblWntHqEFJBIoPsQDcBmsh3/Bjbfp19DA3VXsE4nPT3gAQeU4+HzA9yrT2jdo3a3sK5ccu6AZhWZz8Pkwbfp19DAXBeNRiMtPeAXddSkXlKSkZVUQkV4YmN259CXES5qFrQtaMOqoIUAsA6i8DTQ14GlJs6dlp6bDkyN60u83INFBcauJJQuYXgUpLqgpCCrNKcMzHgvNusSaFLJlp5xttVSSGFyDkwE1zIRvUoHJAgOjQivM95940sSZUZZhTxO9LTZdqCDfKEleHDGuEGLZOIGBxGUAIxIQmWVae0Mb9OvoYDZ3snuMJQyt0EEA4nAQHcq09oDGO0PvhDkKIQUkEig+xB9+nX0MBrNZDv8AgwtB3VXsE4nPT3ge5Vp7QBJTj4fMMQs0btb2FcuOXdBd+nX0MAGZz8PkwKCui8apxGWnvGu5Vp7QDEv2R4+8EgDbgSKHA/Zjffp19DAEjIHv06+hjyAVj1GY7x7wTo55esZuSMcMMfKAagcx2T4e8a9IGh9I1W5e6oGJ184AEFls/D5EZ0c8o9Sm4anuw++UAzC83w8fiNukDQ+kaL6+XDXn/tABiI2xm1tyTiWcHnlJYZOi3ylsK/lvFX8sTnRzyinbbTBTMSyQLxYRMTgSACFLbbDDAxIxK38OYgBWEkImBuwA2lDrbOoalVy7CAeBqreq4duJWwWUOOzM1SpVNOhB4DdttSqqf/SR5wlIqblgoqNUScoupNTUNuLTUnM13FdYmNkrMW1JsNr7dy+7WtS66S68f861Ra3oiEjDrXZHcIX6OeUbpeAwocMPKKpHiPENdJGh9IGJc8oAaMx3j3h6FdyRjhhj5QTpA0PpAbTHZPh7wpC9s7QSsun+0Pts1y3i0pJpjgK1PgIhnNrEkEy8rNTFPzJa3LWv95MFCad1YCzS2fh8iGo549te/fKA5Z0uoYFKn1Tj4FKj8FgJ5fmPrHnS5h00VPzpBGUtI7lBPJx9CqeYgL5NcPH4gN06RRFy9U3XGbZdp+YzTCCrnRuYTpoIVW1KAAKl7VQo4BK53dqJ5bybAV4VidSjcOmyuR7/AIEGjniEutgLbdtSXpQBDqWp9KhrdQpxXkoQ3IbYvIvCYaQ+hFL7speK2+b0q5+K3hj1b8QlbH+0fvhGkDs+cbmkB+XdQ42rsqSqowwOWR5Qz0c8vWAFGQXo55esZANRq72T3GA9J5eseF+uFM8M9YAMbsdoffCCdG5+n9Y8LV3rVrThlnhAMwGayHf8GNek8vX+keXr+GXHXl8wAYPKcfD5jOjc/T+sRVq7RSsmoIffSlSxUJopSgkfmIQCUpx7RoICdjn9r/iWq4Ck0CJRoKzHVVMzqxyrumxXui5y1opcQlxspWhQBStKryVA5EEZxRVLV0+aWTh0ptAHc1IJ9n1+Zia90T2MWu2FtMyye3Nza0Omlf7OxMPPO1GVKC7/ANURe2DUV7/cxRdl2FP2jMOGoRJpcl0Vy3sw+p91Q5hG7T4mLqHbvVpWnHLPGE90x2MwivM9594N0nl6/wBIibatpiWpvXOuvFDKElx1f8KE4mmtKDjSIDxjW1rdl5am/eQgq7CCarX/AAIHWX4AxRnrcnZyqZZG5b4lCklRzpemSFNtHVLSXVDDEVqBSViSzSip+YIWe1UuS5XjWi3nTvnh3uBB/SMotFZlEzEJS0NvlKUWmGLiuHSLwdKakFSZRoKfVyCgiuoiKcbnJgf2h1wJUcEuOJs5rh2W5cqfX/CtxJx4ZRbrHs9sC6whttBxO7CQk14m72idYlf2WgiiiSDmDSh8KRblrHeUbmeyk2VsruKFLiWdRLsoaKgR+Z53eOrP7wUmvGsSjGy7CzfLO+UD231qmCO7fKVdGOSQBjEsvZln/DLjRxpullsY/uDqK8UmBCWnJfFCkTSOKFAMO8yFp/DUacClGXaieasR0hGp83hsxQACApumW7ISB/L2T4iFHGJlH5kucnEltX+dsFP/AGRZZaYvpCrqkapWLpFM68PEEiFp225Zn+9mWW/43EJ9zEfM9k8qvftVCDSYSpkcVqoWqVFfxU1SnP8APdJxwwiyIk2lJqMUkYEKJBB8aGK9NfUKyhh0lDpOFGkLfPju0qp4wtJ7XtgESdmTqwTUXWNw2a8QXSlOOeELZJkiuk4vZpkYtFbCtWlXU46tmrav5kmFzYrl5tbiw4ttYLbqUhtYT+ZKswQoVBAoDWtAQCEmbVtd7syEvLiub0zvVU4G6yigPK9C9osTqE7ydtlmVbIoQyy21U54OPqWThwAivNKdD7VWWJUO2nKKSy8hJW+gm6zMpQKlLgPVSsgUDgoQaVqMIs1mTgeZaeAKQ4hKwDmAtIUAeYrHMnG5dZvtNvTgQarnLQdcTKNUpVSG10S6QRglCQP3hHTUTFABQHAYjAHuHCKpNRkL9J5esZAAj1GY7x7wx0can0jxTIGNThj5QB4HMdk+HvAekHlERa20G7fl5RLSnXZgkgJokNtopvHFqOAAqBTMnAQElBZYY+H+kVraraIsuJk5NAfnnRVtsnqNI4uvEdlA0zOQhBewC1gOTVqTy3jmWnQw2k1r1GwmgGFMawF+iobIN16VNKoXHpp9Clcd3LuqYaRjwARWmVVHWBbM2pMszC7Nm3N8sI30q+RQusghKgsDDeIJoSMxjBrBTuZyalVC6h09LlzlW/RM0nH9LlFf9YeILqcRZz61K/Dk3+vep+HLzGS71P7tDooa0CbyTxUIqNlWpfnLQnL4VJCbYLblRdK0BsvXa4nqtt8sE0jrjTaSKpVUaggj0jku0comYTMyFTem7XCMMClCWJZ11XglPqIC9fTiUUiSQ64KOzKlTL2t583wDXHqpupx/TEzPPJRfWtQQhIqpSiEpSAMSScBEda+0KJYpYbbLryh+DLNAXykYXlEkJbbGRWqg0qcIq1v2IXih215i6jEhDbjbUqyRShIdN59Q/URTRIEB5M7XvTilNWYg3BguaUBTPHdheCf411OIKULhux9jE0Up2r6ln8S9W65StA6pRvTGeS+pXENpwERCNqGRRmzVzM6EVTdalG1NpNKiq0hpKR3ViTlZ633kIG4kpPCi1OFTiuRShCiEdyirvi0TEI6yt7dmqyJAAwAGNB8QKeclpdJL8wltPG+tKBh3xV3NjJl8f2215tf7svclUZ1AoASdMcYZsjYixt64hDTL7zZG+Di+kOJKsr4WTStOIiZvaTlgmNs7EZevS5Dj5ND0VlxSl1wFS2m654k8IbO2s67/7WxZpYNaF9bcqOWCyT50i3MySGh+GkIAGSUpSMOSQI96QeXrFEqkp23XRW7IygIHaLkwsE/wANE+8COzlouV39sugEdmXZbZp3KJUfEUi5Bwq6pyOnLGCdHGp9ICmMfTqVWSH352Zw/wAaacVpwSR5GsSkpsDZjfZkJc/xtpc/86xOrTcxHdj98o16QeUBoZdDYAbQlA0SAkYUplGpMGR18+GnP/aN+jjU+kBkrke/4EbuMpVS8kGmVQDTzgKlXDQd+P3yjzpB5QEM/s82qY6Q+tx9SFXmUuEFpk4EFDaQE3h+tVVcxEpB0N3usczp5Rt0can0gFoyGejjU+kZAGjV3snuMK75WvtHocJwJwOBygBxDW1s0iadbdD78u62lSEuMKShRQuilJN5KgRVIOsWTcJ09TEbbdptSjYcXeqSEtoQCtxxZ/KhP5jQE6AAk0ArAebP7OS8klQYQbyzedcUStxxWq1qxUfSHLTmENtlxxaUIRitSjdSkAGpJOUcttn6muBYQl5KFHssy7YnHiP3nCQ2DnVKErpTtGKvtPtFajqSt1ibS02CpJelFJShQx3l5CQm8BUAqBCakjHEV5vRTnjy6rNtPtA/NTjDdnNFMw2lzdKWBvN28lKVuKQrBhvskFfWJA6hBg//AKROTADlo2g6+7TJNFISTSt3eg4YDJKa0EQe1M67YllS7bSrk7OkrmHqfiCgClgE/pvpTyxOBMX76QPvrs1tUy6XHLysVKvqSkmqUqOd4A1ocRURaFo35uUW3YDtkzADa7pKSth9n8Fa0A0WlQGF9NQSDVJqPBeW23mEzLszu0vPpStbKkU3YcebZZU6pJOYbZACRxUrhF++uLyW25Y0BVv10HEoLKr/AIVKPIRxSz3d2ps0wqpJ4mhr/pGVp5ZnTlta2O06dP2ct9lbRWu1kSZdVV8NoU5OOrAzcecThhkEICU4AYZzUhObONrDrjofeJFXZkOvrJGRqtNBTkBHFZNDi5tDbCarcWEtprTFZoE1OAxoYsVs2PabV0vyD6bhvX0ILgA41U3VI4Zwm1vKHq8NTBkx82S81n01+bust9Q7JwQmdZSBgAaoAHiABDLG0sk6qjc7LLJJwS82T5BUfPUrbja+qrBWRHPjgcYkTPo3LqPwlNqQbwUhBI4gpJF5JqOGsZfxMxOrVep/Ja3pz4s0T+/rLsW0+0ymyiUkQl+deH4KQQpDSMi86RkhPqRSKdaeyLlgli1JVTj5bqm0rxqp1tw3lrAOQBp5JJriY5zZVktbpJUjrEYkFST/ANpGkWCQnHWuqJmaCCLpSH1EXTmAlwLT5iJ/iqb1Kn8i4maReup3G9b6/hr73frOtJqZYTMMqC23E3kKGmNe4g4EcCDHkcs+nks8y2tmzZ5taSSsyk42UrTXBV1bSj1ThUpBFeAJMT0z9Q0yjwlrRlFtOXb5UwvpLdwkgKN2i0gkHApjeLRMbh5F8OSl+S0TE+i8MdoffCHIhbIt2Umk35R9t0ilQlVVJr+pJxTxzEPb5WvtFmY01kO/4MLQVo3jRWIz09oNuE6epgBynHw+YYhZ0XaXcK58cu+NN8rX2gNpnPw+TAoO0m9irE5ae0E3CdPUwGS/ZHj7wSFFrKSQDQfZjzfK19oByMhPfK19oyA0j1GY7x7w5uxoPKNXEChwGUASOW/Wfetll4BW5uONrWKkNKWps1NOyFJSU3tCR+bHol86nzMCm5xtpCnH3EoaSOupagEgU41w8IiY3GlbV5omPVyDYC3JCWZZCJhqXmt8FTrj6a79rrApacoQEmqSACKUNc6xa9ttvJF6SmpeXfD7jjDqQloKczQU1UQLqE44kmIXaaYs4i+izpZhB6yX3pdIcdBxJalgEqI/fduJ5Kyjms5P1adakWLjSAFPqqCsprdSp1QpUXlYJACU1GAzivNrpHdSb68MdZX765TDb8tJT6EB9kodQk1UAhb6EFpdU8UlBwOFRQxIf/ztagMi+wTi09e/ldTh6oV5RyaQ2imJdpcqsJelncVMOiqNbzZCgUmuN5Cs84csTbFySZcakmuj70guukF1zqghIStQCUAXjTqk9Y4xbcL80aWj63W2lybQyk1EuhV/HAOukEp7wlKf83KObJWQpCACogEkDHEg/wC/KNg4pxRUSakk3lGqiTipRGJUoknrE8Ys300StM+Cyu5MXVmWCxVt5YpfZWr8t5FesMiR3HP7VmMVi19SuuwGzos1fTJqSemXCKtPy1yaaQlQFLqWzfvUwKqUplnF/Z28s5av/eIbUfyu3mFaZOgRH2XINTCVTUg4uQmLxTMNAVQHh2kPsHqk1xvpukggg4wd+3t2C3a8khLfZ6SlPSJVyvFQIKmRjTrigxxpjGro15K7tczKWsoyslLNTD3+LOgXW5Yal1H98vRFSIqe1X0qnJRO9lj0xkCpTSjye5Irf8MeUd6sxDG6R0cN7oiqN2E3Kfu3cI8Uo1OJzPGImsT3aY8t8c7rOnyxI2oR1RjQ4pVgpJ4jURLy88heFaHQ/B4x13bX6eStoVdH4EzTB9A7R4bxI7elc8seEcPt6x5mRe3E4i4fyLAq24NUqy8MCONI48vDecPpOB+NTOq5O/3fosUjaqZV1uYUogtqC0oHbcp+QDgFdkk4AEnQQEzTr7zk3M9Z15QKk1ICUDstjiABpFbaVRQUcSCCampIHCpiwsuhYqk1Ec9pmteWHr4aVzZ/nX7xGoj29fr+CzL2hYeKekySAUgBL8spTD7YGAuqGKqaExarKtuZbRvG3DacqO2QkInmP4mxg/wyCVd8czEHkJ1xhYdZWULGRHEaEZKHIxpj4q0T4usOTjPgWHLG8Xht937+ju1gWqzNID0u4HEEZjMHCqVJOKVDQgGJaOWWK+mfcL8qpMlaSRVd0VZmkj/iIFL4xGPaThQkRa7B2h36lS7ySxNtirrBVXDg42rJxs6jLIx31tFo3D5HPgvhvNMkamFgm+Hj8QCDS4rWuOWeOsH3Y0HlFmIcrke/4EGhV/A4YYcMIHfOp8zAbP8AaP3wjSGWUgipFTzx4wTdjQeUAlGQ7uxoPKPIDeNXcj3GEaRGbTLUmWcurKCbib6cFJStxCFlJ4EBRx4QEZtRtk1KhSG0795OCkg0baVSoDq/yk/oFVHQDGOOWtttNF4uOqQ47huTdq2weKWkEkIXSoCyFKxzEIbb22oL3TaQ2gKWGUjJtN6hpqtWBUs1JPp1b6S7FyqJBidcbS6+4Q8lxQqWzWiQjSmZPEnujON2+jnrNsvXtCt7M/TuatJRfnVOy7KjXE/2l0/qJWDdHNQrhlxhP6izsqlK7MlJBtttsdZ1xG6cDqa/ihZN5SaIu3lCi72eAr3MxXNutlv2gxdbuJmGzfYWrIcFoJAJuqBIOeNDTCLRXUdGtaRSuqw+dWreeQjdPKeRevOKJF/eFaKtEtuUAFc1JIqFZGGtk91NOHpSnxRSQ263cLTa1VuhaVJIqaGmIrSLemyJta35T9nFx5pttiYLbyKBpf4zaRvFdUHA1QE5cIamdgbRm03VSrMqFXLy1u4ndput9Rq8nqjKgHaOOMRPXyTjvFbxbk6/vzaizkvDo86FKH+FMMpoRdBKSUqBuKAHWQcCDgTEftWyUS8u2xcSqSCnGXGQsvLNUqcdcvgBtNRePaxIFYmf2RarNGFSJfUOql5tad2sDJSqkFPjSL1sJseplp5c6ELemBccSklSENUwbrhU4kkjDEAZVjLHW8TrWoe1xeThbV+ZE81u0fr7wUstZn2mrUkloZmindzCVAlp25gtp0Jxqk4pWMQDxBibRPWkEkLkZd1NDg1MmpzqKOtJHrHObJm5qyJl9hhIf3IvTMvU7x5hNN1NNUFCsIIQtPG4DTGo6fYdusTzImZdd5CvBSVAYpUPykf1GEdDyJU2bl3GXN9KSc9IOEFS0pQ1Myizmd40y4o1/eQEnE5xtY/1Sl950efBlXsOuUOIZXWvWG9AW2DTJQpzOcX+kDtqxGJxjczDYWkgU/Uk8FJOaSNRAbIcCkhaSFJIqlQIKSNQRnG1uWKxONKYmW0uNq4HgdUnNJ5iKDYuzamH1yrUyuTmk/iIU2AqXnGsE71TKhdS6MErCLtMCMCKSC7Jtd03XLQl2EA4KlmCXVinHemjZ/hrlnBDl31C2Acsr8dtZdkyQAVEbxonIHK8OYHlFQl7RKTVoFR8k+MfQcl9OpILDswHJx3i5NLLpzrQJwSBypHN/qZ9PlyC1TUqgrk1EqcQMTLk8f4PbI8DGOTFE9Yh6fB8fekxS1tR6+cKsw2uYB3jxR/y2urTQknFUGlJxSFBh89b/Dc4ODnoqIxh6lFoPcREqlTcygtrGOnykxxW9Jjp+D6fFG9Wx28fvO4t7T+WuycsaZLUwy6lV0ocSonRNevXldrG+222D05OtLYO5MuStpQHWQmgwXTtX6YpyoaUzrVDaLjB3DnXVT8FZyUDgL/d8RI2JZxyUes6oX1nCgJ6yjoAKnuETWbY479+ymWmHjckbr1rGre3t9Z9fT6u/bGW70ptW8RuphshEyzWtxdKgjVKgbyToeRiwxydzaFLj6p+UZWFSyAmZRh/aZMGhUBwcbpfSDmCRyjocpMIdQl1tQUhaQpChkpKhUGPQraLRuHxubDfFeaXjUm5o9bw+TAaw1K5Hv8AgQaLMg5fsjx94JCb46x++AgdICQjIj6R7Ae3DofIwpa9nl9h1jFO8bUgKp2VEG6rwND4RMxo72T3H2gPlq25QupWFJuuJUokfpcSohxPgQR4R2L6LT+8ssNVqpl1bdONCoOJw7l+kVn6pWLuJpM0gfhzOC9EPoGf/USK97Z1gP0btIS9oOSqjRM0i+0OG9aCiR3lJP8AkEY18NuVx4d48s457d4dkuHQ+RgjGBxww44Q1AZrId/wY2dikS6gxtC6MAmck0rrXtOMKuf+H/jF0mDWlMc8sdIoG3atxP2VO8A+qVd/hmAAkk8ADeMdAlcz4fMAG4dD5GDy5ABBwx44QeFZnPw+TAc322X0S3bNngaNvhUq8cKVJITU8O2D/JG+1lhvWdMLtazUkozn5VI6jrYxU4gU6qxiTTSv6gXfq5Y6pmzXFN13suoTDdM6tg36fyknvSItOyFsJnZJiZTiHUVUNFiqXB4KBHhAaWJajU2wiZYVfbcFQRmDxSrRQOBHKJhtYoMRlHMJxBsCd3yAf2ZNro+nMSrxyWBwQqvpTgkHol4HrAgg4gjEEHEEHjAK7SWWJlsXHA2+0reSzudxwAjEcUqBKVDiFHlALAtTpLV4tlt1BLcwzmWnU9pPMGoUk8UqBiQMQ20japR4Wk0klAARPNpFSpkVo8AM1teZSVDgBATiUmowOY4QytSSCCQQcCDQgg51jwOBSLySClSapIxBBFQRCsBx36i/S8slU3ZqbyMVOyoxI4lTQz53OHDSOYysxe6wBTQ6ioPdwj6zZ7Q++Eco+rf07NVWjIo6wxmWEj+8GZcSB+YcQM8861yyY4t1ju9Dg+OthmK2nwuTmWDpurJ6x7WZqeNYlLLnVXjLvf3qcjwcTwI1NIimXgoBST3cjEo+yJlAIN11GKVDgf8AQ+kcVp/tt/x9LhjU/Nw9/TytHp9fRZ7Pn9ww+EH8SYAaHG42Kl1R/iqEjuUeEWb6Y7RJEw5ZxAQhdXpNFahOZdaBOlCsDS9wEc0s61QQUPENuIwWCaA8xX2hSatzdTDT7CwVsqStJFT2akio4Hsnvi+Cb1vy+Tn+J14bPw85YnxTO/f01r21/t9VMKABrhjxwgu8Go84jJG0ETDTUw3W462laKihooVHvBo73yQjoqSRiOWPCNLh0PkYal+yPH3gkAjcOh8jHsOxkAPfp19DGq3QQQDicBC0eozHePeAjtpbAE5LOSyxS+OorCqHE4trHcQPCsfPb77jCkvDqPyztaaOtruuI7iQR3R3u09tZdKSmWWiZdoSEoUC2gAkFTzoqllAoa1xN0hIJFI+fNsZsFSrhvbxaluLPVC1qJU45QnqJUpSikHGlONYyyd49XNxEeKuu+30vYFttzcs1MoqEuoCqHNJ/Mk8wajwhx1V7BOJz0945x9LLRLNkFcy2plDDjl1SkqBcQq64kpSRVRJcugCtSBTOOjS4oqnI+4jV0qZ9WrOW5Zb6kii2Sh9BzILSgSRobt7GLRYVoJeYamB2Xm0ODj2khR8qw1akml9l1lQql1tbahqFpKT7xSPpFNldmNNLNVy63WFfyLJT4XSB4QF936dfQwF0XjVOIy094FDMrke/wCBALupupUpY6oBKsj1QMcOOEUP6Eou2apwkhDsw6tpONEJBCaJ0FUn1i1fUCcLNmzjgNCGHAkjgpSSlJ8yIjfpxIhiy5NsAj8ELIP6nSXVeq4Cx2rKMzLK2HkhbbiSlQIOR9iMweFI55sjPuWbMixpxRU2qps2YVktH/CUeChw54cUx0OIrbXZZFoyhYUbjgAWw7+ZtwUKSDoaUPI60MBMFlWntBy8k4cO4xUPpvtUuaQuUmxcnZU3JhJzWBglwag8eeOREWQQEFYa+iPqs413K0qckCeCf8Vj+QmqR+hVB2IsO5Vp7RC7UWWqYZ/CN2YaUHpVRyDzeKQf3V4oUOIUYktm7ZTOS6H0gpJqFoPabcSbriFaFJBEAyhBSQSKD7EG36dfQx7Mdk+HvCkBxf6tbDdHUq0ZNP4KjWaZSKbsnNxI4J10Jrllz+WfKSFpP+hEfVTbYVVKgCkpIIOIIOBBHER84fUPZc2XOFtAJl36rlsez+tvH9JPkU84wzY+aNw9b4dxs4rclp6eXtKPm1y7pC1tlSgKAHDwJBxiOCwVEpSEpHBIoK/0+Y0KFK7RoNBn4n/SCgcI5fsxrb3Lf1Lc3LEf41Mu3/RW0y9ImXOK5Vwt55tq67Z5ZlP8sdA3KtPaOBfRy2+j2oGVGiJpu5/Omqm/ZQ/mEfRMd9J3WJfKcTTky2rHlIDbgSKHA/Zjffp19DC7/aP3wjSLMDe/Tr6GPIVjIAvRzyjlO2m3CJjfycvMhgN4KeCiVPrABDbRR2E1qFLJ4AcSR2CPlO29n5pgql3JB8uX1XVhtSkOVUVJulIortDLLvitt66M8k214WmzLUy46ZGWopUwBeSTRH4ZK76zoLoVX/WO9bJ7CSsolBLaXpoYrmFi8b/5rgNd2OAAFaUrGfT7ZJNmSu5qFurJW84AReJ7IxJICRQU1qeMWljtD74QrWIKY4r180LbsglLiJt5D8yWyOjsNpvpQ5Qi+E0AvmtN44qiRlTEmbZqkBShSoxFakE40PDDLCG4DNZDv+DFmjOkDQ+kc82ESWrUteTySXUTTdf+ckqcx8U+UXqKJaR3G0Um4nHpUs404kUNA2SpKjpkBX93vgOgdHPKNkKuYHvw++UMQrM5+HyYCk/Wqfu2U62mt95bbKBh1ipV4geCDFvkpG42htOSEJQK/uJCfiKP9Qxv5yyZHMLmTMLH7sumuPEVqqnjHRWDh5+5gA9HPKN0vAYUOGHlB4RXme8+8BRvqTY7qXG7YkQelSw/FQMn2Mb6SBmQK+FeIFLTs1azU9LommDVCxke0lQ7SVUyIP8ArD9Y5napVs9P9JQk/s2cUA+hIqGHv1JHAZmnEVHBMB1HckY4YY+UUq1JkWXOmcxElOKCZvRiYoEtu54JX2VdwMXlDyVt30KCkqTVKgaggioIPERG2lINzDTjDybzbiShY5EcDwPEHgQICQU6FCg45aa8I16OeUUT6f2quWmFWLNrq6yKybiiPx5ahuU1UkDLRJ/SY6LALJTcNT3YffKK9t9s8i0pNcucHB12Fn8jqQbuPAHI8jFkmsh3/BhaA+UQFJKm3ElDjZKHUnApUk0NfKFnpygWADUdkgGh18o+hNtfpqxaKi+hZl5kAAupF5LgyAWmuNP1DHWtBHPpn6LWiK0dl3BwJcdQT/LdoPOMPkxE7etHxKbY4rM6n1c7Qpd9LqSULSAW9QtJvBXIAx9VbJ7RJnZRmZAoVp64H5VjquJ8CD6RxuW+jE6Tdedl20nMpU4tXLqhKQfEx1rZTZ9uQl0yzalLAUVqUrNS1UvGgwSMMo0pEw4uIvS/WJ6p0tlXWGR18ozo55esGl+yPH3gkXcxXo55esZDUZAL9J5eseb+uFKVwrXWAx6jMd494A3Rufp/WPC1d61a04ZZ4QzA5jsnw94AfSeXr/SPL1/DLjry+YDBZbPw+RAL2o+3LsuPvLuttpK1mmQSKmmp0HGKtsRZzi3XLWmkUemUgMNqwMvLJ/u0fxKFFK/3iZtuylTkw206kiUZKXVg0pMPAktoIr2EUClAiiiUjgoRMzQy8fiA96Ty9Y8u38cuGvP5gMMyuR7/AIEBQJRHSNonSDVMlKJbJ0deVfH/AGqOPKL4HLvVpWnHLPGKP9Ijv0z1oHHpU2stq1ZbolvPEcRQ6RdX+0fvhAE6Ty9f6R4GK41zxy1gMOtdkdwgAmW5+n9YTteVammVy77YW24kpUK8DoeBGYPCJSI8QHMtjbVcsebNjTqyZdw1s+YVgKKPYJ4YmlOCuShHUm2wrJYPdj8xD2/s7LT6EszTQcSFApxKVJOWCkkEV444xDI+kdmJxaQ8yf1Nvug+qjAbfUzZZyYZRNSppOSit5LkYFQGK268a8BxIpkTEnsRtci0JVMwkALHUfRXFDoAvDLLiDoeRgUnsgqXoWrSnqAjquuIfTwAH4iCQOQIil7TsrsWe/ajCSqTmDdnmk/kWTg4BkKk1HO8PzCCXV71/DLjry+Y96Nz9P6wCy5lDqUutKC21pvIWMlA0IMPwQW7HOvhl/vHvSeXr/SMm+Hj8QCANdv45cNefzHvRufp/WNpXI9/wINALBy71aVpxyzxj3pPL1gb/aP3wjSAP0nl6xkAjIBno41PpHimQManDHyg8au9k9xgF+kHlGBwq6pyOnnAo3Y7Q++EAbo41PpGq03MR3Y/fKGIDNZDv+DAD6QeUeo6+fDTn/tAYPKcfD5gNujjU+kAm26pU0FEBaSL3EXgRUd2cOwrM5+HyYCl/SZxbMkqScSEuybzjLg1qd4hY1CgvA8ouyG73WOZ08oUSwkKUsJAUsJC1cVBFbtdaXj5w/L9kePuYDXo41PpA98Rhhhh5Q1CK8z3n3gCGYPKCdGGp9IVMSEABTIGNThj5Rp0g8oYd7J7jCUAUOFXVOR0841nLMbdbU06m+2sFK0qoQoHMGMY7Q++EOQHMEfRyVZFGp6fbFckvISNeDYgyPpg0P8A5K1K8plI/wDzjoc1kO/4MLQEFYWyRZcC/wBoWg6E0/DeeS4g943Y01izdGGp9I1lOPh8wxALKVcNB34/fKPOkHlGTOfh8mBQB0N3usczp5Rt0can0jaX7I8feCQAejjU+kZBoyAT3ytfaPQ4TgTgcDlA49RmO8e8A1uE6epjRxsJFRgfsQeBzHZPh7wC++Vr7Rs0bxorEZ6e0Cgstn4fIgDbhOnqYE6LtLuFc+OXfDMLzXDx+IAe+Vr7QRpN7FWJy09oBDMrke/4EBtuE6epgC1lJIBoPsw3Cb/aP3wgM3ytfaDIaBAJGJxMLQ61kO4QGu4Tp6mFw8rX2hyI8QBQ4TgTgcDlB9wnT1MKozHePeHoADjYSKjA/YgW+Vr7QxMdk+HvCkAVo3jRWIz09oNuE6epgMtn4fIhqAWdF2l3CufHLvjTfK19oJNcPH4gEAdpN7FWJy09oJuE6epjWVyPf8CDQCi1lJIBoPsx5vla+0Y/2j98I0gN98rX2jI0jIDI9RmO8e8exkA7A5jsnw948jIBWCy2fh8iMjIBqF5rh4/EZGQAIZlcj3/AjIyANCb/AGj98IyMgNIdayHcI8jIDeI8R7GQHqMx3j3h6MjIAcx2T4e8KRkZAFls/D5ENRkZALzXDx+IBGRkAzK5Hv8AgQaMjIBN/tH74RpGRkBkZGRkB//Z";
    Mosquito.appendChild(MosquitoImage);

    MosquitoCount++;
    document.getElementById("MosquitoCount").innerText = MosquitoCount;

    Mosquito.addEventListener("click", () => hitMosquito(Mosquito));
    startTime = new Date().getTime();

    gameArea.appendChild(Mosquito);

    spawnInterval = setTimeout(() => {
        if (document.body.contains(Mosquito)) {
            gameArea.removeChild(Mosquito);
            errors++;
            document.getElementById("errors").innerText = errors;
        }
    }, MosquitoSpeed); // Mosquito lifespan before disappearing
}

function hitMosquito(Mosquito) {
    const reactionTime = new Date().getTime() - startTime;
    document.getElementById("reactionTime").innerText = reactionTime;
    score++;
    document.getElementById("score").innerText = score;
    Mosquito.remove();
}

function stopGame() {
    clearInterval(gameInterval);
    clearInterval(gameTimerInterval);
    clearTimeout(spawnInterval);
    document.getElementById("startButton").style.display = "inline";
    document.getElementById("stopButton").style.display = "none";
}

function updateTimer() {
    gameTime++;
    document.getElementById("gameTimer").innerText = gameTime;
}
