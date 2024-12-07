const createCelebrate = async (req, res) => {
  try {
    const { date, name, description, type, icon, picture, wishFuture } = req.body
    
  } catch (error) {
    console.error("Error in createCelebrate controller: ", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}