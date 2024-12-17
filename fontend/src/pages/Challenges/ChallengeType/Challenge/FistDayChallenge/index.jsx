import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FirstDayChallenge({ setPerformChallenges, setQuestionNumber, challenge }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState(Array(challenge.questions.length).fill(null))
  const [selectedOption, setSelectedOption] = useState(null)

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
  }

  const handleSubmit = () => {
    if (selectedOption !== null) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = selectedOption
      setAnswers(newAnswers)

      if (currentQuestion < challenge.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
      } else {
        setQuestionNumber(prev => prev+1)
        setPerformChallenges(false)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(answers[currentQuestion - 1])
    }
  }

  const question = challenge.questions[currentQuestion]

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999] bg-[rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl overflow-hidden border-4 border-pink-200">
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold question-highlight mb-4">
                    {question.questionText}
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {question.answer.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => handleOptionSelect(option)}
                        className={`w-full text-left justify-start ${
                          selectedOption === option ? 'bg-pink-200' : 'bg-pink-50'
                        } hover:bg-pink-100 text-pink-800 transition-all duration-300 rounded-xl py-4 px-6 text-lg font-medium option-button`}
                      >
                        <span className="text-lg font-bold mr-4 text-pink-500">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </button>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 flex justify-between items-center">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="bg-transparent border border-pink-500 text-pink-500 hover:bg-pink-50 rounded-xl py-2 px-4 text-lg font-medium disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <div className="text-pink-500 font-medium text-lg">
                    Question {currentQuestion + 1} of {challenge.questions.length}
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                    className="bg-pink-500 hover:bg-pink-600 text-white rounded-xl py-2 px-4 text-lg font-medium disabled:opacity-50"
                  >
                    {currentQuestion === challenge.questions.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
