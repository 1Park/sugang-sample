<template> 
<div>
    <p> {{message}} </p>

</div>
</template>



<script>
import { jwtDecode } from 'jwt-decode';



export default {
  name: 'EveryMain',
  
  created(){
    //console.log("Everymain page")
    const token = localStorage.getItem('token'); // 저장된 JWT 토큰을 가져옴

    if(!token){ //토큰 없을 시 로그인화면
        this.$router.push('/login')
    }
    else{ // 발급된 토큰 종류에 따라 라우팅
        const decoded = jwtDecode(token)
        console.log(decoded)
        if (decoded.auth == 'Teacher'){
            this.$router.push('/teacher')
        }
        else if (decoded.auth == 'Student'){
            this.$router.push('/student')
        }
        else{
            this.message = "Authorization Error"
            this.$router.push('/login')
        }
            
    }
  }
}

</script>