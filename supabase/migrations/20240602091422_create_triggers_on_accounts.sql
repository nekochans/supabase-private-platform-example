CREATE TRIGGER refresh_accounts_updated_at_step1
    BEFORE UPDATE ON accounts FOR EACH ROW
    EXECUTE PROCEDURE refresh_updated_at_step1();
CREATE TRIGGER refresh_accounts_updated_at_step2
    BEFORE UPDATE OF updated_at ON accounts FOR EACH ROW
    EXECUTE PROCEDURE refresh_updated_at_step2();
CREATE TRIGGER refresh_accounts_updated_at_step3
    BEFORE UPDATE ON accounts FOR EACH ROW
    EXECUTE PROCEDURE refresh_updated_at_step3();
