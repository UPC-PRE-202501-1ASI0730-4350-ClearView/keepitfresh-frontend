<template>
  <div class="profile-container">
    <!-- Acerca de -->
    <section class="section about">
      <div class="info">
        <h2>Acerca de</h2>
        <p><strong>Nombre completo</strong> <span>{{ user.fullName }}</span></p>
        <p><strong>E-mail</strong> <span>{{ user.email }}</span></p>
        <p><strong>Dirección</strong> <span>{{ user.address }}</span></p>
        <p><strong>Teléfono</strong> <span>{{ user.phone }}</span></p>
      </div>
      <div class="avatar">
        <img src="../../assets/defaultpfp.jpg" height="225" width="225"/>
      </div>
    </section>

    <!-- Suscripción -->
    <section class="section subscription">
      <div>
        <h2>Tu suscripción</h2>
        <p>Usted cuenta con nuestro plan <strong>premium</strong></p>
      </div>
      <div class="badge">
        <img src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="Premium Badge">
      </div>
    </section>

    <!-- Opciones -->
    <section class="section actions">
      <div class="action">
        <p><strong>Cambiar contraseña</strong></p>
        <button @click="editPassword">Editar</button>
      </div>
      <div class="action">
        <p><strong>Cambiar correo</strong></p>
        <button @click="editEmail">Editar</button>
      </div>
    </section>
  </div>
</template>

<script setup>
const user = {
  fullName: "Ricardo Huamán",
  email: "ricardoh0607@gmail.com",
  address: "Av. Arenales 1245, Jesús María, Lima",
  phone: "+51 991 223 010"
}

const editPassword = () => {
  alert('Editar contraseña');
}

const editEmail = () => {
  alert('Editar correo');
}
</script>

<style scoped>
.profile-container {
  max-width: 750px;
  margin: auto;
  font-family: sans-serif;
  color: #000;
}

.section {
  background-color: #c4c4c4;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.about .info {
  flex: 2;
}

.about p {
  margin: 6px 0;
}

.about .avatar {
  flex: 1;
  text-align: center;
}

.about .avatar img {
  width: 120px;
  border-radius: 8px;
}

.subscription .badge img {
  width: 100px;
}

.actions {
  display: flex;
  justify-content: space-between;
  text-align: center;
}

.action {
  flex: 1;
}

.action button {
  margin-top: 10px;
  padding: 6px 16px;
  border-radius: 5px;
  border: none;
  background: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
