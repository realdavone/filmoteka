<template>
  <div class="outter">
    <div class="profile">
      <div class="img-socials">
        <div class="img"></div>
        <div class="socials">
          <div class="social"></div>
          <div class="social"></div>
          <div class="social"></div>
          <div class="social"></div>
          <div class="social"></div>
        </div>
      </div>
      <div class="details">
        <div class="name"></div>
        <div class="info">
          <div class="icon"></div>
          <div class="row"></div>
        </div>
        <div class="bio">
          <div class="row"></div>
          <div class="row"></div>
          <div class="row"></div>
          <div class="row"></div>
          <div class="row"></div>
        </div>
      </div>
    </div>
    <div class="media">
      <div class="title"></div>
      <div class="photos">
        <div class="photo"></div>
        <div class="photo"></div>
        <div class="photo"></div>
        <div class="photo"></div>
        <div class="photo"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  div.outter{
    width:100%;
    display:flex;
    flex-direction:column;
    gap:var(--container-padding);

    div.media{
      display:flex;
      flex-direction:column;
      gap:20px;

      div.title{
        height:1.75rem;
        background:var(--font-color);
        width:200px;
        border-radius:6px;
      }

      div.photos{
        display:flex;
        flex-wrap:wrap;
        gap:10px;

        div.photo{
          width:120px;
          height:180px;
          background:var(--dark-color);
          border-radius:6px;
        }
      }
    }
  }
  div.profile{
    display:flex;
    gap:var(--container-padding);
    width:100%;

    div.img-socials{
      display:flex;
      flex-direction:column;
      gap:10px;

      div.img{
        background:var(--card-color);
        width:250px;
        height:250px;
        border-radius:125px;
        overflow:hidden;
      }
      div.socials{
        display:flex;
        gap:10px;
        height:42px;

        div.social{
          background:var(--card-color);
          width:100%;
          height:100%;
          border-radius:8px;
        }
      }
    }
    div.details{
      display:flex;
      flex-direction:column;
      gap:20px;
      background:var(--dark-color);
      border-radius:15px;
      padding:15px;
      width:100%;

      div.name{
        height:1.8rem;
        width:30%;
        background:var(--font-color);
        border-radius:6px;
      }

      div.info{
        div.icon{
          background:var(--theme-color-transparent);
          width:1rem;
          height:1rem;
          border-radius:0.5rem;
          margin:0 calc((30px - 1rem) / 2);
          display:inline-block;
        }

        div.row{
          height:1rem;
          width:40%;
          background:var(--font-color);
          border-radius:6px;
          display:inline-block;
        }
      }

      div.bio{
        display:flex;
        flex-direction:column;
        gap:5px;
        div.row{
          height:1rem;
          width:100%;
          background:var(--font-color);
          border-radius:6px;
        }
      }
    }
  }

  @media screen and (max-width: 800px) {
    div.profile{
      flex-direction:column;
      align-items:center;
    }
  }
  @media screen and (max-width: 600px) {
    div.profile{gap:var(--container-padding);}
  }
</style>