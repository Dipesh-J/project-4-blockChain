const express = require("express")
const router = express.Router()
const axios = require("axios")
const cryptoModel = require("../models/cryptoModel")
const { get } = require("http")

router.get("/assets",async (req,res)=>{
    try {
        const options = {
            url:"https://api.coincap.io/v2/assets",
            method: "get",
            headers: {
                Authorization: "Bearer 1a0f67e0-63cc-46a7-a19d-ac0dddf16300",
              }
        }
        let result = await axios(options)
        console.log(result.data)
        let cryptoData = result.data
        let arrData = cryptoData.data
        let sortedData = arrData.sort((a,b)=>b.changePercent24Hr-a.changePercent24Hr)
        await cryptoModel.deleteMany()
        let finalData = await cryptoModel.create(sortedData)
        res.status(200).send({status:true,data:finalData})
    } catch (err) {
        return res.status(500).send({error:err.message})
    }
})

module.exports = router