<template>
    <section class="container mt-4">
        <h2>Leaderboard</h2>
        <p v-if="leaderboard.length === 0">No scores recorded yet.</p>

        <table v-if="leaderboard.length > 0" class="table table-striped">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Murderer</th>
                    <th>Deaths</th>
                    <th>Rounds</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(entry, index) in leaderboard" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ entry.murderer }}</td>
                    <td>{{ entry.deaths }}</td>
                    <td>{{ entry.rounds }}</td>
                </tr>
            </tbody>
        </table>

        <button class="btn btn-primary mt-3" @click="goHome">Back to Game</button>
    </section>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { useRouter } from "vue-router";

export default {
    setup() {
        const router = useRouter();
        const leaderboard = computed(() => JSON.parse(localStorage.getItem("leaderboard")) || []);

        function goHome() {
            router.push("/");
        }

        return {
            leaderboard,
            goHome
        };
    }
};
</script>
