<template>
  <div class="title">
    <div class="details">
      <div v-for="i in 4" :key="i" class="detail">
        <div class="label"></div>
        <div class="content"></div>
      </div>
    </div>
    <div class="ratings">
      <div class="label"></div>
      <div>
        <div class="rating" v-for="i in 4" :key="i"></div>
      </div>
    </div>
    <div class="overview">
      <div class="label"></div>
      <div class="row" v-for="row in 3" :key="row"></div>
    </div>
    <div class="creators">
      <div v-for="i in 2" :key="i" class="creator">
        <div>
          <div v-for="j in 2" :key="j" class="row"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.title{
  display:flex;
  flex-flow:column;
  gap:1rem;
  max-width:1000px;
  width:100%;
  div.label{
    background-color:var(--font-color);
    border-radius:6px;
    width:70px;
    height:1.2rem;
  }
  div.details, div.creators{
    width:100%;
    display:grid;
    grid-template-columns:repeat(auto-fit, minmax(130px,1fr));
    gap:10px;
    div.detail{
      display:flex;
      gap:10px;
      flex-direction:column;
      div.label{
        width:50px;
        background:var(--font-color);
        border-radius:4px;
        height:1rem;      
      }
      div.content{
        height:0.75rem;
        width:50px;
        background:var(--font-color);
        border-radius:4px;
      }
    }
    div.creator{
      display:flex;
      gap:8px;
      div.photo{
        background:var(--card-color);
        width:30px;
        min-width:30px;
        height:30px;
        border-radius:15px;
      }
      div.row{
        background:var(--font-color);
        height:1rem;
        width:100px;
        margin-bottom:5px;
        border-radius:4px;
        &:last-of-type{
          height:0.75rem;
          width:70px;
          margin-bottom:0;
        }
      }
    }
  }
}
div.quote{
  display:flex;
  align-self:flex-start;
  gap:10px;  
  div.content{
    width:200px;
    height:1rem;
    background-color:var(--secondary-text-color);
    border-radius:4px;
  }
}
div.ratings{
  align-self:flex-start;
  div.label{ margin-bottom:10px }
  & > div:last-of-type{
    display:flex;
    align-items:center;
    gap:15px;
  }
  div.rating{
    width:40px;
    height:40px;
    background-color:var(--card-color);
    border-radius:50%;
    &:nth-child(1){
      width:60px;
      height:60px;
    }
  }
}
div.overview{
  display:flex;
  flex-direction:column;
  align-items:stretch;
  gap:5px;
  align-self:stretch;
  div.label{
    margin-bottom:10px;
  }
  div.row{
    background-color:var(--font-color);
    border-radius:4px;
    height:.85rem;
    width:100%;
    &:last-of-type{ width:80% }
  }
}
@media screen and (max-width: 1300px) {
  div.title{ align-self:center; }
}
</style>