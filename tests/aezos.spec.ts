import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Aezos } from "../target/types/aezos";

describe("aezos", () => {
    anchor.setProvider(anchor.AnchorProvider.env());

    const program = anchor.workspace.Aezos as Program<Aezos>;

    it("Is initialized!", async () => {
        // Add your test here.
        console.log("Aezos program tests initiating...");
    });
});
