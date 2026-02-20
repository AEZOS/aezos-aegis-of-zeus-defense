use anchor_lang::prelude::*;

declare_id!("AEZOS11111111111111111111111111111111111111"); // ← Change after first deploy

#[program]
pub mod aezos {
    use super::*;

    pub fn create_lightning_mark(
        ctx: Context<CreateLightningMark>,
        scam_type: u8,
        proof_hash: [u8; 32],
        metadata: String, // optional JSON or IPFS hash
    ) -> Result<()> {
        let mark = &mut ctx.accounts.lightning_mark;
        mark.scammer = ctx.accounts.scammer.key();
        mark.reporter = ctx.accounts.authority.key();
        mark.timestamp = Clock::get()?.unix_timestamp;
        mark.scam_type = scam_type;
        mark.proof_hash = proof_hash;
        mark.metadata = metadata;
        mark.votes_for = 1;
        mark.votes_against = 0;
        mark.status = 0; // pending
        Ok(())
    }

    pub fn vote(ctx: Context<Vote>, vote_for: bool) -> Result<()> {
        let mark = &mut ctx.accounts.lightning_mark;
        require!(mark.status == 0, ErrorCode::AlreadyFinalized);
        if vote_for { mark.votes_for += 1; } else { mark.votes_against += 1; }
        Ok(())
    }

    pub fn confirm(ctx: Context<Confirm>) -> Result<()> {
        let mark = &mut ctx.accounts.lightning_mark;
        require!(mark.votes_for * 3 > mark.votes_against * 2, ErrorCode::InsufficientVotes);
        mark.status = 1;
        emit!(MarkConfirmed { scammer: mark.scammer, proof_hash: mark.proof_hash });
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateLightningMark<'info> {
    #[account(
        init,
        payer = authority,
        space = LightningMark::LEN,
        seeds = [b"lightning_mark", scammer.key().as_ref(), &proof_hash],
        bump
    )]
    pub lightning_mark: Account<'info, LightningMark>,
    /// CHECK: Scammer being marked
    pub scammer: AccountInfo<'info>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub lightning_mark: Account<'info, LightningMark>,
    pub voter: Signer<'info>,
}

#[derive(Accounts)]
pub struct Confirm<'info> {
    #[account(mut)]
    pub lightning_mark: Account<'info, LightningMark>,
    pub governance: Signer<'info>, // DAO or multisig later
}

#[account]
pub struct LightningMark {
    pub scammer: Pubkey,
    pub reporter: Pubkey,
    pub timestamp: i64,
    pub scam_type: u8,
    pub proof_hash: [u8; 32],
    pub metadata: String,
    pub votes_for: u64,
    pub votes_against: u64,
    pub status: u8,
}

impl LightningMark {
    pub const LEN: usize = 32 + 32 + 8 + 1 + 32 + 200 + 8 + 8 + 1; // ~300 bytes
}

#[event]
pub struct MarkConfirmed {
    pub scammer: Pubkey,
    pub proof_hash: [u8; 32],
}

#[error_code]
pub enum ErrorCode {
    #[msg("Mark already finalized")]
    AlreadyFinalized,
    #[msg("Insufficient votes to confirm")]
    InsufficientVotes,
}
