import React,{useEffect,createRef} from 'react'
import {CircularProgress,Grid,Typography,InputLabel,MenuItem,FormControl,Select} from "@material-ui/core";
import useStyles from "./styles";
import { useState } from 'react';
import PlaceDetails from "../PlaceDetails/PlaceDetails"

const Lists = ({rest,childClicked,isLoading,rating,setRating,type,setType}) => {

const [elRefs,setElRefs]=useState([]);
useEffect(()=>{
    const refs = Array(rest?.length).fill().map((_,i)=>elRefs[i] || createRef());
    setElRefs(refs);
},[rest]);
    const classes = useStyles();
    return (
        <div className={classes.container}>
        <Typography variant ="h4">Hotels , Restaurants and Attractions around you  </Typography> 
        {isLoading ? (
            <div className={classes.loading}>
                <CircularProgress size="5rem"/>
            </div>
        ):(
            <>
            <FormControl className={classes.formControl} >
            <InputLabel>Type</InputLabel>
            <Select value= {type} onChange={e=>setType(e.target.value)}>
                <MenuItem value ="restaurants">Restaurants</MenuItem>
                <MenuItem value ="hotels">Hotels</MenuItem>
                <MenuItem value ="attractions">Attractions</MenuItem>
            </Select>
        </FormControl>
        <FormControl className={classes.formControl} >
            <InputLabel>Rating</InputLabel>
            <Select value= {rating} onChange={e=>setRating(e.target.value)}>
                <MenuItem value ={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value ={4}>Above 4.0</MenuItem>
                <MenuItem value ={4.5}>Above 4.5</MenuItem>

            </Select>
        </FormControl>
        <Grid container spacing={2}  className={classes.list}>
            {rest?.map((place,i)=>(
            <Grid item  key={i} xs={12}>
                <PlaceDetails ref={elRefs[i]} selected={Number(childClicked)===i} place={place} />
            </Grid>))}
        </Grid>  
            </>
        )}   
        </div>
    )
}

export default Lists
