resource "aws_security_group" "example" {
  name_prefix = "stone-lambda-sg"
  vpc_id = var.vpc_id
 
  ingress {
    from_port = 0
    to_port = 65535
    protocol = "tcp"
    cidr_blocks = [var.vpc_cidrs]
  }
 
  egress {
    from_port = 0
    to_port = 65535
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}