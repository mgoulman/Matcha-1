import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import defaultImg from '../../image/default.jpg';
import ReactIdSwiperCustom from 'react-id-swiper/lib/ReactIdSwiper.custom';
import { Swiper, Navigation, Pagination } from 'swiper/js/swiper.esm';
import BlockIcon from '@material-ui/icons/Block';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    height:600,
  },
  avatarON: {
    backgroundColor: '#00FB0C',
    width: 15,
    height: 15,
  },
  avatarOF: {
    backgroundColor: '#e42416',
    width: 15,
    height: 15,
  },
}));

export default function ViewProfile(props) {
  const {user,images,interests} = props;
  const classes = useStyles();
  const value = user.rating;
  const params = {
    Swiper,
    modules: [Navigation, Pagination],
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl:  '.swiper-button-prev'
    },
    spaceBetween: 30 
  }
      const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
      };

  return (
    <Grid container justify='center'>
    <Card  className={classes.card}>
      <CardHeader
      action={ 
        <Box component="fieldset" mb={3} borderColor="transparent">
        <div className={classes.rating1}>
        <Box ml={2}>{labels[value]}</Box>
          <Rating
            name="read-only"
            value={value}
            precision={0.5}
            readOnly
          />
          
        </div>
        </Box>
        
        }
        avatar={
          <Avatar aria-label="recipe" className={user.isOnline === 1 ? classes.avatarON : classes.avatarOF}>
              
          </Avatar>
          
        }
        title={user.firstname +' ' + user.lastname}
        subheader={user.isOnline === 1 ? 'Online' : 'Offline' + user.lastSignIn}
      >
     
      </CardHeader>
      
      <CardMedia
        children={
            <ReactIdSwiperCustom {...params}>
                {
                    images.isImages ? images.images.map((tile) =>
                    <div key={tile.id}>
                        <img  style={{width: "100%"}} src={`http://localhost:5000/images/${tile.path}`} alt="images"/>
                    </div>
                    ) : <img  style={{width: "100%"}} src={defaultImg} alt="images"/>
                }
                </ReactIdSwiperCustom>
        }
      
      />
      <CardContent>
        <Typography >
          <strong>BIO :</strong> {user.bio} 
        </Typography>
        <Typography>
        <strong>TAGS :</strong> {interests != null &&  interests.map((item) =>item.value + ' ' )}
        
        </Typography>
      </CardContent>

      <CardActions disableSpacing >
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color="secondary"/>
        </IconButton>
        <IconButton aria-label="share">
          <BlockIcon color="secondary"/>
        </IconButton>
      </CardActions>
    </Card>
    </Grid>
    
  );
}
